import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import Store from "electron-store";
import { openFileDialog, searchFile } from "./lib/filesystem";

const store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    titleBarOverlay: {
      color: "#000000",
      symbolColor: "#ffffff",
    },
    darkTheme: true,
    titleBarStyle: "hidden",
  });

  // load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

let filePath = "";

// clear the stored file path since we can't do it in the ui yet
// store.set("conversationsFilePath", null);

ipcMain.on("load-file", async (event) => {
  const storedFilePath = store.get("conversationsFilePath") as string;
  if (!storedFilePath) {
    const fileResponse = await openFileDialog();
    filePath = fileResponse.filePaths[0];
    store.set("conversationsFilePath", filePath);
  } else {
    filePath = storedFilePath;
  }
});

ipcMain.on("search-file", async (event, searchTerm) => {
  const searchResults = searchFile(filePath, searchTerm);
  const sortedByCreatedAt = searchResults.sort((a, b) => {
    const dateA = a.item.create_time;
    const dateB = b.item.create_time;
    console.log("Sorting", b.item);
    return dateB - dateA; // For ascending order
  });
  const sortedByMatch = searchResults.sort((a, b) => {
    const scoreA = a.score;
    const scoreB = b.score;
    return scoreA - scoreB; // For ascending order
  });
  event.reply("search-results", searchResults);
});

ipcMain.on("read-conversation", async (event) => {
  // const conversations = readConversations(filepath);
  // const thisThread = conversations.find(
  //   (c) => c.id === searchResults[0].item.id
  // );
  // const assembledThread = assembleThread(thisThread);
  // assembledThread.forEach((node) => {
  //   console.log(node.message?.content.parts);
  // });
  // console.log("searchResults", searchResults.slice(0, 5));
  // event.reply("file-loaded", fileResponse);
  // console.log("fileres", fileResponse);
});

ipcMain.on("open-external", (event, url) => {
  shell.openExternal(url);
});
