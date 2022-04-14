<script lang="ts">
    import { request } from "$/plugins/common/api";
    import type { resolveYtRequest } from "$/routes/api/v1/resolve";

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

    async function search(url: URL) {
        loading = true;
        try {
            const data = parseUrl(url);
            const r = await request<typeof resolveYtRequest>("/v1/resolve", {
                publicKey: null,
                signature: null,
                ...(data.type === "channel" ? { channelIds: data.id } : { videoIds: data.id }),
            });

            result = r.channels?.[data.id] ?? r.videos?.[data.id];
            (document.querySelector("#search-result") as any).focus();
        } catch (error) {
            throw error;
        } finally {
            loading = false;
        }
    }

    let href: string = null;
    let result: string;
    let loading = false;
</script>

<div class="search" class:loading>
    <form on:submit|preventDefault={() => search(new URL(href))}>
        <fieldset>
            <legend>Search</legend>
            <div class="field">
                <input type="text" bind:value={href} aria-label="enter youtube url to search it on LBRY" placeholder="YouTube Channel or Video URL" />
            </div>
        </fieldset>
        <div class="actions">
            <button>Search</button>
        </div>
    </form>
</div>

<div class="search-results">
    {#if result}
        <a id="search-result" href="https://odysee.com/{result}" target="_blank" alt="Search result">{result}</a>
    {/if}
</div>

<style>
    .search {
        width: 100%;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        gap: 0.25em;
    }
    .actions {
        width: auto;
        flex-grow: 1;
    }
    fieldset {
        flex-grow: 100000000000000;
        min-width: min(10em, 100%);
    }
</style>
