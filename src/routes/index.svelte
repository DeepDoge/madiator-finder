<script lang="ts">
    import Button from "$lib/Glow/Button.svelte";
    import TextField from "$lib/Glow/TextField.svelte";
</script>

<div class="content">
    <form class="search g-theme-crazy" on:submit|preventDefault={() => alert("")}>
        <TextField label="Search YouTube Video on LBRY" placeholder="Paste YouTube URL to Search...">
            <div slot="append-after-input">
                <Button type="submit" text="Search" />
            </div>
        </TextField>
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
        display: flex;
        width: min(100%, 30em);
        font-size: 2rem;
    }
</style>
