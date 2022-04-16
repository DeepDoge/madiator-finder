<script lang="ts">
    import "$/app.css";
    import BlindOnlyLink from "$lib/App/BlindOnlyLink.svelte";
    import Navigation from "$lib/App/Navigation.svelte";
</script>

<div id="layout">
    <BlindOnlyLink href="#main-content">
        go to the main content
    </BlindOnlyLink>
    <header>
        <a href="/" alt="Main Page" id="logo">Madiator Finder</a>
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
        font-size: 1.5em;
    }
    header {
        font-size: clamp(.9em, 5vw, 1.25em);
        padding: var(--padding);

        display: flex;
        flex-wrap: wrap;
        --center-at: 20rem;
        justify-items: center;
        gap: 1em;
        background: var(--color-mode);
        border-bottom: solid .1em var(--color-master);

        line-height: 1.5;
        z-index: 1;
    }
    header #logo {
        display: grid;
        justify-items: center;
        font-size: 2em;
        line-height: 1;
    }

    header > :global(*):nth-child(1) {
        flex-grow: 1;
    }

    header > :global(*):nth-child(2) {
        min-width: min(var(--center-at), 100%);
        flex-grow: 10000000000000000000000;
        display: grid;
        justify-items: end;
    }

    main {
        min-height: 100vh;
    }
</style>
