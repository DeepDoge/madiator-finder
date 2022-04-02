<script lang="ts">
    import type { prisma } from "$/plugins/prisma";
    import Box from "$lib/GlowUI/Box.svelte";

    type T = ReturnType<typeof prisma.profile.findMany>;
    const rowsPromise: T = fetch("/api/v1/profile/leaderboard").then((value) => value.json()) as any;
</script>

<ul class="rows">
    {#await rowsPromise}
        ...
    {:then rows}
        {#each rows as row, i}
            <Box glow rounded>
                <li class="row">
                    <div class="rank">#{i}</div>
                    <div class="details">
                        <div class="nickname">{row.nickname}</div>
                        <div class="score">Score: {row.score}</div>
                    </div>
                </li>
            </Box>
        {/each}
    {/await}
</ul>

<style>
    .rows {
        width: 100%;
        padding: 0.5em;

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
        position: relative;
    }
    .details::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--g-color-mode);
        opacity: .8;
    }
    .details > * {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .score {
        font-size: 1.1em;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
