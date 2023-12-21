import { Conversation } from "../types/Conversation";
import { dialog } from "electron";
import fs from "fs";
import Fuse from "fuse.js";
import { SearchableMessage, flattenConversations } from "./flattenConversation";

let fuse: Fuse<SearchableMessage>;

export async function openFileDialog() {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
    });
    if (!result.canceled) {
      return result;
    } else {
      console.error("File open dialog cancelled");
    }
  } catch (err) {
    console.error(err);
  }
}

export function searchFile(filePath: string, searchTerm: string) {
  if (!fuse) {
    const conversations = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const searchableMessages = flattenConversations(conversations);

    fuse = new Fuse(searchableMessages, {
      keys: ["messageText", "conversationTitle"],
      includeScore: true,
      includeMatches: true,
    });
  }
  return fuse.search(searchTerm);
}

export function readConversations(filePath: string): Conversation[] {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data;
}

export function searchAndProvideContext(
  filePath: string,
  conversations: Conversation[],
  searchTerm: string,
  contextSize = 2
): unknown[] {
  const fuseResults = searchFile(filePath, searchTerm);

  // Group the results by conversation ID
  const groupedResults: {
    [conversationId: string]: { item: SearchableMessage; score: number }[];
  } = {};
  fuseResults.forEach(({ item: matchedMessage, score }) => {
    const conversationId = matchedMessage.conversationId;
    if (!groupedResults[conversationId]) {
      groupedResults[conversationId] = [];
    }
    groupedResults[conversationId].push({ item: matchedMessage, score });
  });

  // Sort the grouped results by score (lower is better)
  Object.values(groupedResults).forEach((group) => {
    group.sort((a, b) => a.score - b.score);
  });

  // Prepare the final results array
  const results: {
    conversationId: string;
    conversationTitle: string;
    contextualItems: {
      item: SearchableMessage;
      context: string[];
      score: number;
    }[];
  }[] = [];

  // Generate the final results with contextual items
  Object.entries(groupedResults).forEach(([conversationId, group]) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return;

    const contextualItems: {
      item: SearchableMessage;
      context: string[];
      score: number;
    }[] = group.map(({ item, score }) => {
      const node = conversation.mapping[item.nodeId];
      const allNodes = Object.values(conversation.mapping);
      const nodeIndex = allNodes.findIndex((n) => n.id === node.id);
      const start = Math.max(0, nodeIndex - contextSize);
      const end = Math.min(allNodes.length, nodeIndex + contextSize + 1);
      const contextMessages = allNodes
        .slice(start, end)
        .map((n) => n.message?.content?.parts?.join(" ") || "");

      return {
        item,
        context: contextMessages,
        score,
      };
    });

    results.push({
      conversationId,
      conversationTitle: conversation.title,
      contextualItems,
    });
  });

  return results;
}
