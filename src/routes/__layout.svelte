<script lang="ts">
    import "$/app.css";
</script>

<div id="layout">
    <header>
        <h1>Madiator Finder</h1>
    </header>
    <main>
        <slot />
    </main>

    <footer>Footer</footer>
</div>

<style>
    #layout {
        background: var(--color-mode);
        color: var(--color-mode-inverse);
    }
    header {
        position: absolute;
        inset: 0;
        bottom: unset;
        padding: 0.75em;
        pointer-events: none;
    }

    header h1 {
        font-size: clamp(1.5em, 10vw, 2.5em);
    }

    main {
        min-height: 100vh;
    }
</style>
