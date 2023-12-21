import { Conversation, Node } from "@/types/Conversation";
import { dialog } from "electron";
import fs from "fs";
import Fuse from "fuse.js";

let fuse: Fuse<Conversation>; // Initialize this after reading your data

export async function openFileDialog() {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    if (!result.canceled) {
      // console.log(result.filePaths); // Send these back to the renderer if needed
      // event.reply("selected-directory", result.filePaths);
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
  // console.log("data", data);
  if (!fuse) {
    fuse = new Fuse(data, {
      keys: ["title", "content.parts"], // adjust depending on your JSON structure
      includeScore: true,
      // ...other Fuse options
    });
  }
  const results = fuse.search(searchTerm);

  return results;
}

export function assembleThread(conversation: Conversation): Node[] {
  const thread: Node[] = [];
  let currentNodeId = conversation.current_node;

  while (currentNodeId) {
    const node = conversation.mapping[currentNodeId];
    if (!node) break;

    thread.push(node);
    // Assuming a single-threaded conversation for simplicity. For multi-threaded, you'd recurse through children.
    currentNodeId = node.parent;
  }

  return thread.reverse(); // Reverse to get the conversation in the correct order
}

export function readConversations(filePath: string): Conversation[] {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data;
}

// Usage:
// const conversation = conversations[0]; // or however you access a specific conversation
// const thread = assembleThread(conversation);
// console.log(thread);
