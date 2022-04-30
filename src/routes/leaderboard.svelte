<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
</script>

<svelte:head>
    <title>Leaderboard - Madiator Finder</title>
</svelte:head>

<div class="content">
    <h1>Leaderboard</h1>
    <p>Leaderboard shows the top public contributers of the <b>Madiator Finder</b> community database.</p>
    <p>Be the one who first finds a <b>YouTube</b> Video/Channel that is also on <b>Odysee</b>, earn the points!</p>
    <h2>How to earn points?</h2>
    <ul>
        <li>Install <a href="https://chrome.google.com/webstore/detail/watch-on-lbry/jjmbbhopnjdjnpceiecihldbhibchgek" target="_blank"><b>Watch On LBRY</b></a> extension.</li>
        <li>Create a profile.</li>
        <li>And set your <i>resolver API</i> as <b>Madiator Finder</b>.</li>
        <li>Then start earning points!</li>
    </ul>
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

    a {
        text-decoration: underline;
    }
</style>
