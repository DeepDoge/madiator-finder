<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
</script>

<div class="content">
    <h1>Leaderboard</h1>
    <p>Top contributers</p>
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
