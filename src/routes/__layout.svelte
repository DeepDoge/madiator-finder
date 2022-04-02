<script lang="ts">
    import App from "$lib/GlowUI/App.svelte";
</script>

<App
    colorMode="dark"
    theme="wild"
    colors={{
        master: "#005fd4",
        slave: "#00d476",
        dark: "rgba(39, 42, 49)",
        light: "rgb(235, 237, 241)",
    }}
>
    <header>
        <h1>Madiator Finder</h1>
    </header>
    <main>
        <slot />
    </main>

    <footer>Footer</footer>
</App>

<style>
    header {
        position: absolute;
        top: 0;
        padding: 1.25em 0.75em;
        pointer-events: none;
    }

    header h1 {
        font-size: clamp(1.5rem, 10vw, 2.5rem);
    }

    main {
        min-height: 100vh;
    }
</style>
