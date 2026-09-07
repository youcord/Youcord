const {
    util: { log },
    flux: { dispatcher },
} = shelter;

function track(payload: { event: string; properties: { enabled: string } }) {
    if (payload.event === "join_voice_channel") {
        window.youcord.power.setPowerSaving(true);
    } else if (payload.event === "leave_voice_channel") {
        window.youcord.power.setPowerSaving(false);
    }
}

export function onLoad() {
    const settings = window.youcord.settings.getConfig();
    if (!settings.blockPowerSavingInVoiceChat) return;
    log("Youcord Power Integration");
    dispatcher.subscribe("TRACK", track);
}
