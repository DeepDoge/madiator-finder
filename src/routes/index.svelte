<script lang="ts">
    import Leaderboard from "$lib/App/Leaderboard.svelte";
import Box from "$lib/GlowUI/Box.svelte";
    import Button from "$lib/GlowUI/Button.svelte";
    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";
</script>

<div class="content">
    <section id="section-search">
        <div class="search">
            <h2>Search</h2>
            <form on:submit|preventDefault={() => alert("yo!")}>
                <div class="search-field">
                <TextField />
            </div>
            <div class="search-actions">
                <Button>Search</Button>
            </div>
            </form>
        </div>
        <div class="counters">
            <Row type="fit" idealSize="10em">
                <div class="counter">Videos: 13,324</div>
                <div class="counter">Channels: 1,122</div>
            </Row>
        </div>
    </section>
    <section id="section-leaderboard">
        <div class="leaderboard">
            <h2>Leaderboard</h2>
            <Leaderboard  />
        </div>
    </section>
</div>

<style>
    .content {
        display: grid;
        gap: 1em;
        font-size: 1.5em;
    }

    section {
        display: grid;
        align-content: center;
        justify-items: center;
        padding: 0.5em;
    }

    #section-search {
        
        min-height: max(calc(100vh - var(--header-height)), 15em);
    }

    .search {
        width: min(100%, 40em);
        margin-top: calc(-1 * var(--header-height));
    }
    .search form {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        gap: 0.25em;
    }
    .search-actions 
    {
        width: auto;
        flex-grow: 1;
    }
    .search-field {
        flex-grow: 100000000000000;
        min-width: min(10em, 100%);
    }

    .counters {
        width: min(100%, 40em);
        padding: 1em;
        text-align: center;
        letter-spacing: clamp(0.5ch, 0.5vw, 0.75ch);
    }

    .leaderboard {
        display: grid;
        justify-items: center;
        width: min(100%, 30em);
        text-align: center;
        padding: 1em;
    }
</style>
