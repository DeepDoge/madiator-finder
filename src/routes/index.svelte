<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";
</script>

<div class="content">
    <section id="section-search">
        <div class="search">
            <h2>Search</h2>
            <form on:submit|preventDefault={() => alert("yo!")}>
                <TextField />
                <Button>Search</Button>
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
        <h2>Leaderboard</h2>
    </section>
</div>

<style>
    .content {
        display: grid;
        gap: 1em;
    }

    .counters {
        width: min(100%, 60rem);
        padding: 1rem;
        font-size: 1.5em;
        text-align: center;
        letter-spacing: clamp(0.5ch, 0.5vw, 0.75ch);
    }

    .search {
        width: min(100%, 60rem);
    }
    .search form {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr auto;
        gap: 0.25em;

        font-size: 1.5em;
    }

    section {
        display: grid;
        align-content: center;
        justify-items: center;
        padding: 0.5rem;
    }

    #section-search {
        min-height: 100vh;
    }
</style>
