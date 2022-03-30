<script lang="ts">
    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";
</script>

<div class="content">
    <div class="counters">
        <Row type="fit" idealSize="10em">
            <div class="counter neon-text">Videos: 13,324</div>
            <div class="counter wild-text">Channels: 1,122</div>
        </Row>
    </div>
    <div class="g-theme-wild">
        <TextField />
    </div>
    <div class="">
        <TextField />
    </div>
    <div class="g-theme-inverted">
        <TextField />
    </div>
    <div class="g-theme-master">
        <TextField />
    </div>
    <div class="g-theme-slave">
        <TextField />
    </div>
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
        box-shadow: 0 0 0.5rem 0 var(--g-background-color);
        z-index: -1;
        opacity: 0.25;
    }
</style>
