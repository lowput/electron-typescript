
const { app } = window;

window.onload = () => {
    app.sendMsgToMainProcess('Start Renderer proces.');
}
