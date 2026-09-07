import { createSignal, For, onMount } from "solid-js";
import classes from "./SupportBanner.module.css";

const {
    ui: { ModalRoot, ModalBody, ModalSizes },
} = shelter;

interface Contributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
    type: string;
}

export const AboutPopup = (props: { close: () => void }) => {
    const [contributors, setContributors] = createSignal<Contributor[]>([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);

    onMount(() => {
        fetch("https://api.github.com/repos/youcord/Youcord/contributors")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch contributors");
                return response.json();
            })
            .then((data) => {
                setContributors(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    });

    return (
        <ModalRoot size={ModalSizes.MEDIUM} class={classes.modal}>
            <div className={classes.closeButtonWrapper}>
                <button
                    type="button"
                    className={classes.closeButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.close();
                    }}
                    aria-label="Close"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <ModalBody>
                <div class={classes.aboutContainer}>
                    <div class={classes.aboutHeader}>
                        <div class={classes.aboutLogo}>
                            <img
                                src="https://github.com/nightcordlegit/youcord/blob/main/static/icon.png"
                                alt="Youcord"
                                style={{ width: "120px" }}
                            />
                        </div>
                        <span class={classes.aboutVersion}>
                            {window.youcord?.version === "0.0.0"
                                ? "Dev Build"
                                : `v${window.youcord?.version ?? "1.3.0"}`}
                        </span>
                        <p class={classes.aboutDescription}>
                            A free and open-source Discord client crafted by the community, for the community —
                            delivering advanced features, better performance, and a modern design.
                        </p>
                    </div>

                    <div class={classes.quickActions}>
                        <h3 class={classes.sectionTitle}>Quick Actions</h3>
                        <div class={classes.quickActionsList}>
                            <button
                                type="button"
                                class={classes.quickActionButton}
                                onClick={() => window.open("https://github.com/youcord/Youcord", "_blank")}
                            >
                                <span class={classes.quickActionButtonIcon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <polyline points="16 18 22 12 16 6" />
                                        <polyline points="8 6 2 12 8 18" />
                                    </svg>
                                </span>
                                <span class={classes.quickActionButtonLabel}>
                                    <span class={classes.quickActionButtonTitle}>View Source Code</span>
                                    <span class={classes.quickActionButtonDesc}>github.com/youcord/Youcord</span>
                                </span>
                                <svg
                                    class={classes.quickActionButtonArrow}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                class={classes.quickActionButton}
                                onClick={() => window.open("https://github.com/sponsors/smartfrigde", "_blank")}
                            >
                                <span class={classes.quickActionButtonIcon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </span>
                                <span class={classes.quickActionButtonLabel}>
                                    <span class={classes.quickActionButtonTitle}>Donate</span>
                                    <span class={classes.quickActionButtonDesc}>Support the project</span>
                                </span>
                                <svg
                                    class={classes.quickActionButtonArrow}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                class={classes.quickActionButton}
                                onClick={() => window.open("https://discord.gg/JatCnhKufc", "_blank")}
                            >
                                <span class={classes.quickActionButtonIcon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="none"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </span>
                                <span class={classes.quickActionButtonLabel}>
                                    <span class={classes.quickActionButtonTitle}>Join Discord Server</span>
                                    <span class={classes.quickActionButtonDesc}>Connect with the community</span>
                                </span>
                                <svg
                                    class={classes.quickActionButtonArrow}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class={classes.contributorsSection}>
                        <h3 class={classes.sectionTitle}>Contributors</h3>
                        {!loading() && !error() && (
                            <span class={classes.contributorBadge}>{contributors().length} contributors</span>
                        )}
                        {loading() && <div class={classes.loadingState}>Loading contributors...</div>}
                        {error() && <div class={classes.errorState}>Failed to load contributors: {error()}</div>}
                        {!loading() && !error() && (
                            <div class={classes.contributorsGrid}>
                                <For each={contributors()}>
                                    {(contributor) => (
                                        <a
                                            href={contributor.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class={classes.contributorLink}
                                        >
                                            <div class={classes.contributorCard}>
                                                <img
                                                    src={contributor.avatar_url}
                                                    alt={`${contributor.login}'s avatar`}
                                                    class={classes.contributorAvatar}
                                                />
                                                <div class={classes.contributorName}>{contributor.login}</div>
                                                <div class={classes.contributorInfo}>
                                                    {contributor.contributions} contributions
                                                </div>
                                            </div>
                                        </a>
                                    )}
                                </For>
                            </div>
                        )}
                    </div>

                    <div class={classes.techSection}>
                        <h3 class={classes.sectionTitle}>Technologies</h3>
                        <div class={classes.techList}>
                            <span class={classes.techTag}>Electron</span>
                            <span class={classes.techTag}>SolidJS</span>
                            <span class={classes.techTag}>TypeScript</span>
                            <span class={classes.techTag}>Rolldown</span>
                            <span class={classes.techTag}>shelter</span>
                            <span class={classes.techTag}>Biome</span>
                        </div>
                    </div>

                    <div class={classes.aboutFooter}>
                        <span>Copyright &copy; Youcord 2024-2026 &middot; OSL-3.0</span>
                    </div>
                </div>
            </ModalBody>
        </ModalRoot>
    );
};
