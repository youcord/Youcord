import path from "node:path";
import Url from "node:url";
import { app, net, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
    {
        scheme: "youcord",
        privileges: {
            standard: true,
            secure: true,
            supportFetchAPI: true,
            corsEnabled: true,
            bypassCSP: true,
            stream: true,
        },
    },
]);

void app.whenReady().then(() => {
    // Youcord custom internal protocol
    protocol.handle("youcord", (req) => {
        if (req.url.startsWith("youcord://plugins/")) {
            const url = req.url.replace("youcord://plugins/", "").split("/");
            const filePath = path.join(import.meta.dirname, "plugins", `/${url[0]}/${url[1]}`);
            if (filePath.includes("..")) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        } else if (req.url.startsWith("youcord://html/")) {
            const file = req.url.replace("youcord://html/", "");
            const filePath = path.join(import.meta.dirname, "html", `${file}`);
            if (filePath.includes("..")) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        } else if (req.url.startsWith("youcord://js/")) {
            const file = req.url.replace("youcord://js/", "");
            const filePath = path.join(import.meta.dirname, "js", `${file}`);
            if (filePath.includes("..")) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        } else if (req.url.startsWith("youcord://assets/")) {
            const file = req.url.replace("youcord://assets/", "");
            const filePath = path.join(import.meta.dirname, "assets", "app", `${file}`);
            if (filePath.includes("..")) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        } else if (req.url.startsWith("youcord://css/")) {
            const file = req.url.replace("youcord://css/", "");
            const filePath = path.join(import.meta.dirname, "css", `${file}`);
            if (filePath.includes("..")) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        } else if (req.url.startsWith("youcord://local/")) {
            const file = req.url.replace("youcord://local/", "");
            const userDataPath = path.join(app.getPath("userData"), "userAssets");
            const filePath = path.normalize(path.join(userDataPath, `${file}`));
            if (!filePath.startsWith(userDataPath)) {
                return new Response("bad", {
                    status: 400,
                    headers: { "content-type": "text/html" },
                });
            }
            return net.fetch(Url.pathToFileURL(filePath).toString());
        }
        return new Response("bad", {
            status: 400,
            headers: { "content-type": "text/html" },
        });
    });
});
