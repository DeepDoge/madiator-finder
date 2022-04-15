<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
    import Search from "$lib/App/Search.svelte";
</script>

<div class="content">
    <section id="section-search">
        <h2>Search</h2>
        <Search />
    </section>
    <section id="section-leaderboard">
        <h2>Leaderboard</h2>
        <Leaderboard />
    </section>
</div>

<style>
    .content {
        display: grid;
        gap: 1em;
        font-size: 1.5em;
    }

    #section-search {
        display: grid;
        place-content: center;
        grid-template-columns: min(100%, 40em);
        min-height: 100vh;
        padding: var(--padding-outer);
        gap: var(--padding);
    }

    #section-leaderboard {
        display: grid;
        place-content: center;
        grid-template-columns: min(100%, 35em);
        padding: var(--padding-outer);
        gap: var(--padding);
    }
</style>
