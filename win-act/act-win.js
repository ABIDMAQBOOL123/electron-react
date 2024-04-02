const activeWin = require("active-win");

exports.activeWin = async () => {
  try {
    const activeWindow = await activeWin();
    console.log(activeWindow);
    const appData = {};

    appData.activeWindow = activeWindow.title;
    appData.processName = activeWindow.owner.name;
    appData.timeStart = new Date().toLocaleString("en-us");
    appData.url = activeWindow.url;
    // saveData(appData);
    return appData;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
