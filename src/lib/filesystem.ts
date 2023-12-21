import { dialog } from "electron";

export async function openFileDialog() {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    if (!result.canceled) {
      console.log(result.filePaths); // Send these back to the renderer if needed
      // event.reply("selected-directory", result.filePaths);
      return result;
    } else {
      console.error("File open dialog cancelled");
    }
  } catch (err) {
    console.error(err);
  }
}
