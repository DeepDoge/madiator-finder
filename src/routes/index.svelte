<script lang="ts">
    import TextField from "$lib/Glow/TextField.svelte";
</script>

<div class="content">
    <div class="search">
    <TextField label="Search YouTube Video on LBRY" placeholder="Paste YouTube URL to Search..." />
</div>
</div>

<style>
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .search {
        display: flex;
        width: min(100%, 20em);
        font-size: 2rem;
    }
</style>
