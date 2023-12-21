import { Conversation } from "@/types/Conversation";
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
  if (!fuse) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    fuse = new Fuse(data, {
      keys: ["title", "content.parts"],
      includeScore: true,
    });
  }
  return fuse.search(searchTerm);
}

export function readConversations(filePath: string): Conversation[] {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data;
}
