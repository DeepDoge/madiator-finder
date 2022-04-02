<script lang="ts">
    import App from "$lib/GlowUI/App.svelte";

    let headerHeight = 0;
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
    <header bind:clientHeight={headerHeight}>
        <h1>Madiator Finder</h1>
    </header>
    <main style:--header-height="{headerHeight}px">
        <slot />
    </main>

    <footer>Footer</footer>
</App>

<style>
    header {
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
