import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
    "app", {
        sendMsgToMainProcess: (msg: string): void => {
            ipcRenderer.send('on_received_from_renderer', msg);
        }
    }
);
