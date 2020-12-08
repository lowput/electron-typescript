declare global {
    interface Window {
        app: IMainProcess;
    }
}

export interface IMainProcess {
    sendMsgToMainProcess: (msg: string) => void;
}
