<script lang="ts">
    import { request } from "$/plugins/common/api";
    import type { resolveYtRequest } from "$/routes/api/v1/resolve";
    import Counters, { updateCounters } from "./Counters.svelte";
    import Leaderboard, { updateLeaderboard } from "./Leaderboard.svelte";

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

        throw new Error();
    }

    async function search(href: string) {
        result = null;
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

            result = r.channels?.[data.id] ?? r.videos?.[data.id] ?? "";

            if (result)
            {
                updateCounters.call(null)
                updateLeaderboard.call(null)
                (document.querySelector("#search-result") as any).focus();
            }
        } catch (error) {
            errorMessage = error.message;
        } finally {
            loading = false;
        }
    }
    let errorMessage: string;
    let href: string = null;
    let result: string;
    let loading = false;
</script>

<div class="search" class:loading>
    <form on:submit|preventDefault={() => search(href)} name="Search">
        <div class="field">
            <div class="glow" />
            <div class="border" />
            <div class="background" />
            <input type="url" bind:value={href} aria-label="enter youtube url to search it on LBRY" placeholder="YouTube Channel or Video URL" />
        </div>
        <div class="actions">
            <button aria-label="Search YouTube URL">
                <div class="glow" />
                <div class="background" />
                <span>Search</span>
            </button>
        </div>
    </form>
</div>
<Counters />
{#if result}
    <section class="result-section">
        <h2>Result:</h2>
        <div class="result">
            <div class="glow" />
            <div class="background" />
            <a id="search-result" href="https://odysee.com/{result}" target="_blank" alt="Search result">{result}</a>
        </div>
    </section>
{:else if result === ""}
    No Result
{:else if loading}
    ...
{:else if errorMessage}
    <samp class="error-message">{errorMessage}</samp>
{/if}

<style>
    .search {
        width: 100%;
        font-size: larger;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        gap: 0.25em;
    }
    .actions {
        display: grid;
        gap: 0.5em;
        flex-grow: 1;
    }

    .field {
        flex-grow: 100000000000000;
        min-width: min(10em, 100%);
        --border-width: 0.25em;
        --glow-blur: 0.5em;
        --glow-brightness: 0.75;
        --background: var(--color-mode);
        --background-opacity: 1;
        border: solid var(--border-width) transparent;
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
        padding: var(--padding);
    }

    button {
        display: block;
        background: transparent;
        color: var(--color-mode-inverse);
        font-size: inherit;
        font-weight: bold;
        border: none;
        appearance: none;
        border-radius: var(--border-radius);
        padding: var(--padding);
        cursor: pointer;
    }

    button {
        --border-width: 0px;
        --glow-blur: 0.2em;
        --glow-brightness: 0.75;
        --background: var(--color-mode);
        --background-opacity: 0.95;
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
        color: var(--color-error);
    }

    .result-section {
        display: grid;
        gap: var(--padding)
    }

    .result {
        --border-width: 0px;
        --glow-blur: 0.5em;
        --glow-brightness: 1;
        --background: var(--color-mode);
        --background-opacity: 0.95;
    }

    .result {
        display: grid;
        padding: calc(var(--padding) * 2);
    }
    .result a {
        background: var(--color-gradient-1);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .glow {
        position: absolute;
        inset: calc(-1 * var(--border-width));
        background: var(--color-gradient-1);
        filter: blur(var(--glow-blur)) brightness(var(--glow-brightness));
    }

    .background {
        position: absolute;
        inset: 0;
        background-color: var(--background);
        border-radius: calc(var(--border-radius) / 2);
        filter: opacity(var(--background-opacity));
    }

    .border {
        position: absolute;
        inset: calc(-1 * var(--border-width));
        background: var(--color-gradient-1);
        border-radius: var(--border-radius);
    }

    .glow,
    .border {
        animation: background-anim 5s linear infinite alternate;
        background-repeat: repeat;
    }
</style>
