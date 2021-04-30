import { BrowserWindow, app } from 'electron';
import path from 'path';

let mainWindow;

function isDev() {
    return !app.isPackaged;
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    	width: 800,
        height: 600,
        titleBarStyle: 'hidden',
		transparent: true, 
		vibrancy: 'light',
		trafficLightPosition: {
			x: 20, 
			y: 36
		},
		webPreferences: {
			contextIsolation: false,
			spellcheck: true,
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
		},
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    // Open the DevTools.
    // mainWindow.webContents.addDevToolsExtension('/Users/lukesmetham/Library/Application Support/Google/Chrome/Profile 3/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.0_0');
	mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
