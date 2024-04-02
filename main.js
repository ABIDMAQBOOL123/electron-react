const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const url = require("url");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "App Tracker",
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "./cra/build/index.html"),
    protocol: "file",
  });

  mainWindow.on("close", (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      // Optionally notify the user that the application is still running.
      // This could be a Tray balloon or a custom notification.
    }
  });

  mainWindow.loadURL(startUrl);
  // mainWindow.loadURL("http://localhost:3000");
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  // On macOS, do not quit the app when all windows are closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

let tray = null;
app.on("ready", () => {
  tray = new Tray("./ico.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => mainWindow.show() },
    { label: "Exit", click: () => app.quit() },
  ]);
  tray.setToolTip("Your App Name");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
});




// const { app, BrowserWindow, Menu, Tray } = require("electron");
// const path = require("path");
// const url = require("url");

// let mainWindow; // Declare mainWindow outside of createWindow function

// const createWindow = () => {
//   mainWindow = new BrowserWindow({
//     title: "App Tracker",
//     width: 1000,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: true,
//     },
//   });

//   mainWindow.webContents.openDevTools();

//   const startUrl = url.format({
//     pathname: path.join(__dirname, "./cra/build/index.html"),
//     protocol: "file",
//   });

//   mainWindow.on("close", (event) => {
//     if (!app.isQuitting) {
//       event.preventDefault();
//       mainWindow.hide();
//       // Optionally notify the user that the application is still running.
//       // This could be a Tray balloon or a custom notification.
//     }
//   });

//   mainWindow.loadURL(startUrl);
// };

// app.whenReady().then(createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// let tray = null;
// app.on("ready", () => {
//   const iconPath = path.join(__dirname, "ico.png"); // Correct icon path
//   tray = new Tray(iconPath);
//   const contextMenu = Menu.buildFromTemplate([
//     { label: "Open", click: () => mainWindow.show() }, // Access mainWindow
//     { label: "Exit", click: () => app.quit() },
//   ]);
//   tray.setToolTip("Your App Name");
//   tray.setContextMenu(contextMenu);

//   tray.on("click", () => {
//     mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show(); // Access mainWindow
//   });
// });









