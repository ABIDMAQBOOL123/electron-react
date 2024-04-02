const { contextBridge } = require("electron");
const os = require("os");

const { activeWin } = require("./win-act/act-win");

contextBridge.exposeInMainWorld("electron", {
  homeDir: () => os.homedir(),
  activeWindow: async () => await activeWin(),
});
