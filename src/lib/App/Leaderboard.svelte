<script lang="ts" context="module">
    import { request } from "$/plugins/common/api";
    import type { getLeaderboardRequest } from "$/routes/api/v1/profile/leaderboard";
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";

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

<ul class="rows">
    {#if !$leaderboardRows}
        ...
    {:else}
        {#each $leaderboardRows as row, i}
            <li class="row">
                <div class="glow" />
                <div class="background" />
                <div class="rank">#{i + 1}</div>
                <div class="details">
                    <div class="nickname">{row.nickname ?? row.publicKey.substring(row.publicKey.length - 64, row.publicKey.length - 32)}</div>
                    <div class="score">Score: {row.score}</div>
                </div>
            </li>
        {/each}
    {/if}
</ul>

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
        padding: 0.5em;
        border-right: solid 0.1em var(--g-current-color);
    }

    .details {
        display: grid;
        justify-content: right;
        text-align: right;
        padding: 0.5em;
    }

    .details > * {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .row {
        --border-width: 0px;
        --glow-blur: 0.2em;
        --glow-brightness: 0.75;
        --background: var(--color-mode);
        --background-opacity: 0.95;
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
    
    .glow {
        animation: background-anim 5s linear infinite alternate;
        background-repeat: repeat;
    }

    .score {
        font-size: 1.1em;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
