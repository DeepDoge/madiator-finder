<script lang="ts">
    import { request } from "$/plugins/common/api";
    import type { resolveYtRequest } from "$/routes/api/v1/resolve";
    import Hako from "$modules/hako-ui/Hako.svelte";
    import BlindOnlyLink from "./BlindOnlyLink.svelte";
    import Counters, { updateCounters } from "./Counters.svelte";
    import { updateLeaderboard } from "./Leaderboard.svelte";

    function parseUrl(url: URL): { type: "video" | "channel"; id: string } {
        console.log(url, url.href);
        if (url.hostname === "youtu.be") {
            return {
                type: "video",
                id: url.pathname.substring(1),
            };
        }

        if (url.pathname.startsWith("/channel/")) {
            return {
                type: "channel",
                id: url.pathname.substring("/channel/".length),
            };
        }

        if (url.pathname === "/watch") {
            return {
                type: "video",
                id: url.searchParams.get("v"),
            };
        }

        throw new Error("Invalid URL");
    }

    async function search(href: string) {
        loading = true;
        try {
            const url = new URL(href);
            const data = parseUrl(url);
            const searchParams = new URLSearchParams();
            switch (data.type) {
                case "channel":
                    searchParams.set("channel_ids", data.id);
                    break;
                case "video":
                    searchParams.set("video_ids", data.id);
                    break;
                default:
                    throw new Error();
            }

            const r = await request<typeof resolveYtRequest>(`/v1/resolve?${searchParams.toString()}`, {});

            result = r.channels?.[data.id] ?? r.videos?.[data.id] ?? EMPTY;

            if (result) {
                updateCounters.call(null);
                updateLeaderboard.call(null);
            }
        } catch (error) {
            result = error;
        } finally {
            loading = false;
            await new Promise<void>((r) => setTimeout(r, 1000));
            document.querySelector<HTMLAnchorElement>("#search-result").focus();
        }
    }

    let href: string = null;

    const EMPTY = Symbol();
    let result: string | Error | typeof EMPTY;

    let loading = false;
</script>

<div class="search" class:loading>
    <form on:submit|preventDefault={() => search(href)} name="Search">
        <div class="field">
            <Hako />
            <input
                id="search-field"
                type="url"
                bind:value={href}
                aria-label="enter youtube u.r.l to search it on LBRY"
                placeholder="YouTube Channel or Video URL"
            />
        </div>
        <div class="actions">
            <button>
                <Hako />
                <span>Search</span>
            </button>
        </div>
    </form>
    <Counters />

    {#if result}
        <BlindOnlyLink href="#search-field">go back to search field</BlindOnlyLink>
    {/if}

    {#if result instanceof Error}
        <samp id="search-result" tabindex="0" class="error-message">{result.message}</samp>
    {:else if result === EMPTY}
        <span id="search-result" tabindex="0">No Result</span>
    {:else if result}
        <article class="result">
            <h2 id="search-result" tabindex="0">Result:</h2>
            <div class="result-details">
                <Hako />
                <a href="https://odysee.com/{result}" target="_blank" title="LBRY video URL">{result}</a>
            </div>
        </article>
    {:else}
        <!-- Nothing has been searched yet -->
    {/if}
</div>

<style>
    .search {
        display: grid;
        gap: 1.5em;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        gap: 0.25em;
        font-size: larger;
    }
    .actions {
        display: grid;
        gap: 0.5em;
        flex-grow: 1;
    }

    .field {
        flex-grow: 100000000000000;
        min-width: min(10em, 100%);
        --h-border-width: 0.25em;
        border: solid var(--h-border-width) transparent;
    }

    @keyframes background-anim {
        0% {
            background-size: 100%;
        }
        100% {
            background-size: 150%;
        }
    }

    input {
        width: 100%;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
        border: none;
        padding: var(--h-padding);
    }

    button {
        display: block;
        background: transparent;
        color: var(--h-color-mode-inverse);
        font-size: inherit;
        font-weight: bold;
        border: none;
        appearance: none;
        border-radius: var(--border-radius);
        padding: var(--h-padding);
        cursor: pointer;
    }

    button:hover,
    button:focus-within {
        filter: brightness(1.25);
    }
    button:active {
        filter: brightness(1.5);
    }

    .loading {
        filter: saturate(0);
        cursor: progress;
    }
    .loading > * {
        pointer-events: none;
    }

    .error-message {
        color: var(--h-color-error);
    }

    .result {
        display: grid;
        gap: var(--h-padding);
    }

    .result-details {
        display: grid;
        padding: calc(var(--h-padding) * 2);
    }
    .result-details a {
        background: var(--h-color-gradient-1);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
