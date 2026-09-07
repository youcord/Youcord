# Youcord Clipboard Fallback Plugin

Fixes Discord in-page copy actions in Youcord, including:

- Copy User ID
- Copy Message ID
- Copy Message Link
- Other Discord menu actions that call `navigator.clipboard.writeText(...)`

## Why this exists

In affected Youcord/Electron environments, Discord's web UI calls:

```js
navigator.clipboard.writeText(text)
```

but Chromium rejects it, commonly with errors like:

```text
NotAllowedError: Failed to execute 'writeText' on 'Clipboard': Document is not focused.
```

or Youcord logs:

```text
Unable to determine render window for element [object HTMLDocument]
```

This plugin patches `navigator.clipboard.writeText` in the Discord page and falls back to a selection-based `document.execCommand("copy")` copy path.

## Known limitation

Youcord's native **Copy Image** context-menu action does not go through `navigator.clipboard.writeText` or `navigator.clipboard.write` in the page. It is handled by Electron's main-process context menu (`webContents.copyImageAt(...)`), so a renderer/custom-bundle plugin cannot reliably fix image copying. That needs a Youcord main-process fix or a filesystem plugin with main/preload access on newer Youcord versions.

## Install on Youcord versions with filesystem plugins

1. Open the Youcord plugins folder:

   ```text
   ~/Library/Application Support/youcord/plugins
   ```

2. Create this folder:

   ```text
   clipboard-fallback
   ```

3. Copy these files into it:

   ```text
   manifest.json
   renderer.js
   ```

4. Restart Youcord.
5. Enable **Clipboard Fallback** in Youcord's plugin settings.

## Older Youcord workaround: custom bundle

If your Youcord version does not have filesystem plugins yet, copy `custom-bundle.js` into:

```text
~/Library/Application Support/youcord/custom.js
```

Do **not** use `renderer.js` as `custom.js`; `renderer.js` is the filesystem-plugin entry and expects Youcord's plugin loader to provide `module.exports`.

and add `"custom"` to the `mods` array in:

```text
~/Library/Application Support/youcord/storage/settings.json
```

Example:

```json
"mods": ["equicord", "custom"]
```

Then restart Youcord.
