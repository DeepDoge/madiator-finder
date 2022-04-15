<script lang="ts">
    import "$/app.css";
import BlindOnly from "$lib/App/BlindOnly.svelte";
import BlindOnlyLink from "$lib/App/BlindOnlyLink.svelte";
    import Navigation from "$lib/App/Navigation.svelte";
</script>

<div id="layout">
    <BlindOnlyLink href="#main-content">
        go to the main content
    </BlindOnlyLink>
    <header>
        <h1><a href="/" alt="Main Page">Madiator Finder</a></h1>
        <Navigation
            name="Main Navigation"
            items={[
                {
                    label: "Search",
                    pathname: "/",
                },
                {
                    label: "Leaderboard",
                    pathname: "/leaderboard",
                },
            ]}
        />
    </header>
    <main>
        <div id="main-content" aria-label="main content" />
        <slot />
    </main>

    <footer>
        Footer
        <a href="#main-content" aria-label="go back to the main content">Go Top</a>
    </footer>
</div>

<style>
    #layout {
        background: var(--color-mode);
        color: var(--color-mode-inverse);
    }
    header {
        padding: 0.75em;

        display: flex;
        flex-wrap: wrap;
        --center-at: 20rem;
        justify-items: center;
        gap: 1em;
        background: var(--color-mode);
        border-bottom: solid .1em var(--color-master);

        z-index: 1;
    }
    header > h1 {
        display: grid;
        justify-items: center;
        font-size: clamp(1.5em, 10vw, 2.5em);
    }

    header > :global(*):nth-child(1) {
        flex-grow: 1;
    }

    header > :global(*):nth-child(2) {
        min-width: min(var(--center-at), 100%);
        flex-grow: 10000000000000000000000;
        font-size: larger;
        display: grid;
        justify-items: end;
    }

    main {
        min-height: 100vh;
    }
</style>
