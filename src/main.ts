import { BrowserWindow, app, App, ipcMain, IpcMainEvent } from 'electron'

class ElectronApp {
    private win: BrowserWindow | null = null;
    private app: App;
    private mainURL: string = `file://${__dirname}/render/index.html`

    constructor(app: App) {
        this.app = app;
        this.app.whenReady().then(this.create.bind(this));
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
        this.app.on('activate', this.onActivated.bind(this));
        ipcMain.on('on_received_from_renderer', this.onReceived.bind(this));
    }

    private onWindowAllClosed() {
        this.app.quit();
    }

    private create() {
        this.win = new BrowserWindow({
            width: 800,
            height: 400,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: `${__dirname}\\preload.js`
            }
        });
        this.win.loadURL(this.mainURL);

        this.win.on('closed', () => {
            this.win = null;
        });
        //this.win.webContents.openDevTools();
    }

    private onActivated() {
        if (this.win === null) {
            this.create();
        }
    }

    private onReceived(event: IpcMainEvent, msg: string) {
        console.log(`onReceived: ${msg}`)
    }
}

const MyApp: ElectronApp = new ElectronApp(app);
