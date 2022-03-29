<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";
</script>

<div class="content">
    <div class="counters">
        <Row type="fit" idealSize="10em">
            <div class="counter">Videos: 13,324</div>
            <div class="counter">Channels: 1,122</div>
        </Row>
    </div>
    <form class="search g-theme-crazy" on:submit|preventDefault={() => alert("")}>
        <label for={null}>Search YouTube Video on LBRY</label>
        <div>
            <div class="search-text">
                <TextField required placeholder="Paste YouTube URL to Search..." />
            </div>
            <div class="search-submit">
                <Button type="submit" text="Search" />
            </div>
        </div>
    </form>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        gap: 2em;
        align-items: center;
        justify-content: flex-start;
        min-height: 100vh;
    }

    .content > * {
        width: min(100%, 60rem);
    }

    .counters {
        font-size: 1.5rem;
        padding: 2em;
    }

    .counter {
        position: relative;
        padding: 1.5em 2em;
    }
    
    .counter::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--g-background-color);
        border-radius: var(--g-border-radius);
        box-shadow: 0 0 .5rem 0 var(--g-background-color);
        z-index: -1;
        opacity: .25;
    }

    .search {
        display: grid;
        gap: 0.25em;
        font-size: 1.75rem;
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
