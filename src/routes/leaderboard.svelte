<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
</script>

<svelte:head>
    <title>Leaderboard - Madiator Finder</title>
</svelte:head>

<div class="content">
    <h1>Leaderboard</h1>
    <h2>What is Leaderboard?</h2>
    <p>Leaderboard shows the top public contributers of the <b>Madiator Finder</b> community database.</p>
    <h2>How to become a public contributer?</h2>
    <p>You can become contributer by installing our <b>Watch On LBRY</b> extension and enable the . </p>
    <Leaderboard />
</div>

<style>
    .content {
        display: grid;
        place-content: center;
        grid-template-columns: min(100%, 35em);
        min-height: 50vh;
        padding: var(--h-padding-page);
        gap: var(--h-padding);
    }
</style>
