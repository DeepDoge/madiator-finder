<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
    </script>

<div class="content">
    <section id="section-leaderboard">
        <h2>Leaderboard</h2>
        <p>Top contributers</p>
        <Leaderboard />
    </section>
</div>

<style>
    .content {
        display: grid;
        gap: 1em;
        font-size: 1.5em;
    }

    p {
        font-size: smaller;
    }

    #section-leaderboard {
        display: grid;
        place-content: center;
        grid-template-columns: min(100%, 35em);
        padding: var(--padding-outer);
        gap: var(--padding);
    }
</style>
