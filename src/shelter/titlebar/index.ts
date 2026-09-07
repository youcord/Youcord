/// <reference path="../../../node_modules/@uwu/shelter-defs/dist/shelter-defs/rootdefs.d.ts" />
const {
    util: { log },
    flux: { dispatcher },
} = shelter;
const titlebarOverlayHTML = `<nav class="titlebar">
          <div class="window-title" id="window-title"></div>
        </nav>`;

const titlebarNavControls = `
          <div id="window-controls-container">
              <div id="spacer"></div>
              <div id="minimize"><div id="minimize-icon"></div></div>
              <div id="maximize"><div id="maximize-icon"></div></div>
              <div id="quit"><div id="quit-icon"></div></div>
          </div>
`;

const settings = window.youcord.settings.getConfig();

function injectButtonControls() {
    const elem = document.createElement("div");
    elem.innerHTML = titlebarNavControls;
    elem.id = "youcordNavControls";
    document.body.append(elem);
    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const quit = document.getElementById("quit");

    minimize!.addEventListener("click", () => {
        window.youcord.window.minimize();
    });

    maximize!.addEventListener("click", () => {
        if (window.youcord.window.maximized() === true) {
            window.youcord.window.unmaximize();
            document.body.removeAttribute("isMaximized");
        } else if (window.youcord.window.isNormal() === true) {
            window.youcord.window.maximize();
        }
    });
    const minimizeToTray = settings.minimizeToTray;
    quit!.addEventListener("click", () => {
        if (minimizeToTray === true) {
            window.youcord.window.hide();
        } else if (minimizeToTray === false) {
            window.youcord.window.quit();
        }
    });
}

function layerPush(payload: { type: string; component: string }) {
    console.log(payload.component);
    if (payload.component === "USER_SETTINGS") {
        const elem = document.createElement("div");
        elem.innerHTML = titlebarOverlayHTML;
        elem.id = "youcordTitlebar";
        document.body.prepend(elem);
    }
}

function layerPop() {
    console.log("pop!");
    document.getElementById("youcordTitlebar")?.remove();
}

export function onLoad() {
    log("Youcord Titlebar Controller");
    if (settings.windowStyle === "default") {
        document.body.setAttribute("customTitlebar", "");
        injectButtonControls();
        return;
    }

    // Native + transparency on macOS uses the same overlay chrome as "overlay" (Youcord#1095).
    const overlayLike =
        settings.windowStyle === "overlay" ||
        (settings.windowStyle === "native" && window.youcord.platform === "darwin" && settings.transparency !== "none");

    if (overlayLike) {
        document.body.setAttribute("customTitlebar", "");
        dispatcher.subscribe("LAYER_PUSH", layerPush);
        dispatcher.subscribe("LAYER_POP", layerPop);
        return;
    }

    log("Unsupported window style");
}

export function onUnload() {
    dispatcher.unsubscribe("LAYER_PUSH", layerPush);
    dispatcher.unsubscribe("LAYER_POP", layerPop);
}
