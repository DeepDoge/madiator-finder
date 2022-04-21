<script lang="ts" context="module">
    import { request } from "$/plugins/common/api";
    import type { getLeaderboardRequest } from "$/routes/api/v1/profile/leaderboard";
import Hako from "$lib/hako-ui/Hako.svelte";
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";
    import BlindOnly from "./BlindOnly.svelte";

    const leaderboardRows: Writable<typeof getLeaderboardRequest["TYPE"]["OUT"]> = writable(null);
    export async function updateLeaderboard() {
        leaderboardRows.set(await request<typeof getLeaderboardRequest>("/v1/profile/leaderboard", {}));
    }
    async function task() {
        while (true) {
            await updateLeaderboard();
            await new Promise((r) => setTimeout(r, 20000));
        }
    }
    task();
</script>

<ol class="rows">
    {#if !$leaderboardRows}
        ...
    {:else}
        {#each $leaderboardRows as row, i}
            <li class="row">
                <Hako />
                <div class="rank">#{i + 1}</div>
                <article class="details">
                    <div class="nickname">
                        <BlindOnly>
                            {row.nickname ? "nickname" : "public key"}
                        </BlindOnly>
                        {row.nickname ?? row.publicKey.substring(row.publicKey.length - 64, row.publicKey.length - 32)}
                    </div>
                    <div class="score">Score: {row.score}</div>
                </article>
            </li>
        {/each}
    {/if}
</ol>

<style>
    .rows {
        width: 100%;
        padding: 0;
        margin: 0;
        display: grid;
        justify-content: stretch;
        justify-items: stretch;
        gap: 0.5em;
    }

    .row {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: stretch;
    }

    .rank {
        display: grid;
        place-items: center;
        padding: var(--h-padding);
        border-right: solid 0.1em var(--h-current-color);
    }

    .details {
        display: grid;
        justify-content: right;
        text-align: right;
        padding: var(--h-padding);
    }

    .details > * {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .row {
        --h-border-width: 0px;
        --h-glow-blur: 0.2em;
        --h-glow-brightness: 0.75;
        --h-background-background: var(--h-color-mode);
        --h-background-opacity: 0.95;
    }

    .score {
        font-size: larger;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
