import { BrowserWindow, app, ipcMain, IpcMainInvokeEvent } from 'electron'
import path from "path";

const mainURL = `file://${__dirname}/render/index.html`

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    win.loadURL(mainURL);
    win.on('ready-to-show', () => {
        win.webContents.send('receive:message', "Hello Electron!!");
    });

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});

app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle('send:message', (_: IpcMainInvokeEvent, msg: string) => {
    console.log(`ipcMain on : ${msg}`);
});
