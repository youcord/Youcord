const { ipcRenderer, webFrame } = require("electron");

import type { ModBundle } from "../../../@types/ModBundle.js";

const requiredPlugins: Record<string, [string, { isVisible: boolean; allowedActions: Record<string, true> }]> = {
    "youcord-arrpc": ["youcord://plugins/rpc/", { isVisible: false, allowedActions: {} }],
    "youcord-settings": ["youcord://plugins/settings/", { isVisible: false, allowedActions: {} }],
    "youcord-power": ["youcord://plugins/power/", { isVisible: false, allowedActions: {} }],
    "youcord-screenshare": ["youcord://plugins/screenshare/", { isVisible: false, allowedActions: {} }],
    "youcord-titlebar": ["youcord://plugins/titlebar/", { isVisible: false, allowedActions: {} }],
};
if (process.platform === "darwin") {
    requiredPlugins["youcord-touchbar"] = [
        "youcord://plugins/touchbar/",
        { isVisible: true, allowedActions: { toggle: true } },
    ];
}
async function inject() {
    try {
        await ipcRenderer.invoke("getShelterBundle").then(async (bundle: ModBundle) => {
            if (bundle?.enabled) {
                await webFrame.executeJavaScript(`(()=>{
                const SHELTER_INJECTOR_PLUGINS = ${JSON.stringify(requiredPlugins)};
                ${bundle.js}
            })()`);
            }
        });
    } catch (e) {
        console.error(e);
    }
}
inject();
