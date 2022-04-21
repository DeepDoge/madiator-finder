<script lang="ts">
    import Search from "$lib/App/Search.svelte";
</script>

<div class="content">
    <h1>Search</h1>
    <Search />
</div>

<style>
    .content {
        display: grid;
        place-content: center;
        grid-template-columns: min(100%, 40em);
        min-height: 50vh;
        padding: var(--h-padding-page);
        gap: var(--h-padding);
    }
</style>
