<script lang="ts">
    import { request } from "$/plugins/common/api";
    import type { getLeaderboardRequest } from "$/routes/api/v1/profile/leaderboard";

    const rowsPromise = request<typeof getLeaderboardRequest>("/v1/profile/leaderboard", {});
</script>

<ul class="rows">
    {#await rowsPromise}
        ...
    {:then rows}
        {#each rows as row, i}
            <li class="row">
                <div class="rank">#{i + 1}</div>
                <div class="details">
                    <div class="nickname">{row.nickname ?? row.publicKey}</div>
                    <div class="score">Score: {row.score}</div>
                </div>
            </li>
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
        opacity: 0.8;
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
