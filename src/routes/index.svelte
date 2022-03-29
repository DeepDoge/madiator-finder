<script lang="ts">
    import Button from "$lib/Glow/Button.svelte";
    import TextField from "$lib/Glow/TextField.svelte";
</script>

<div class="content">
    <form class="search g-theme-crazy" on:submit|preventDefault={() => alert("")}>
        <label for="search">Search YouTube Video on LBRY</label>
        <div>
            <div class="search-text">
                <TextField required placeholder="Paste YouTube URL to Search..." />
            </div>
            <div class="search-submit">
                <Button _id="search" type="submit" text="Search" />
            </div>
        </div>
    </form>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        gap: 5em;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .search {
        display: grid;
        gap: 0.25em;
        font-size: 2rem;
        width: min(100%, 30em);
    }

    .search > div {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25em;
    }

    .search-text {
        flex: 100;
        min-width: min(100%, 20em);
    }

    .search-submit {
        display: flex;
        flex: 1;
    }
</style>
