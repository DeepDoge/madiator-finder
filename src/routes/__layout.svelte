<script lang="ts">    
    let headerHeight = 0;
</script>

<header bind:clientHeight={headerHeight}>
    <h1>Madiator Finder</h1>
</header>
<main style:--header-height="{headerHeight}px">
    <slot />
</main>

<footer>Footer</footer>

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
