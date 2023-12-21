import { Conversation, Node } from "@/types/Conversation";
import { dialog } from "electron";
import fs from "fs";
import Fuse from "fuse.js";

let fuse: Fuse<Conversation>;

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
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!fuse) {
    fuse = new Fuse(data, {
      keys: ["title", "content.parts"],
      includeScore: true,
    });
  }
  return fuse.search(searchTerm);
}

export function assembleThread(conversation: Conversation): Node[] {
  const thread: Node[] = [];
  let currentNodeId = conversation.current_node;

  while (currentNodeId) {
    const node = conversation.mapping[currentNodeId];
    if (!node) break;

    thread.push(node);
    // Assuming a single-threaded conversation for simplicity.
    // For multi - threaded, you'd recurse through children.
    currentNodeId = node.parent;
  }

  return thread.reverse();
}

export function readConversations(filePath: string): Conversation[] {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data;
}
