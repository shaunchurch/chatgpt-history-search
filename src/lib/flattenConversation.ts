import { Conversation } from "../types/Conversation";

export type SearchableMessage = {
  conversationId: string;
  conversationTitle: string;
  nodeId: string;
  parentNodeId: string | null;
  messageText: string;
  createTime: number | null;
  updateTime: number | null;
};

export function flattenConversations(
  conversations: Conversation[]
): SearchableMessage[] {
  const searchableMessages: SearchableMessage[] = [];

  conversations.forEach((conversation) => {
    Object.values(conversation.mapping).forEach((node) => {
      searchableMessages.push({
        conversationId: conversation.id,
        conversationTitle: conversation.title,
        nodeId: node.id,
        parentNodeId: node.parent,
        messageText: node.message?.content?.parts?.join(" ") || "",
        createTime: node.message?.create_time,
        updateTime: node.message?.update_time,
      });
    });
  });

  // console.log("searchableMessages", searchableMessages);
  return searchableMessages;
}
