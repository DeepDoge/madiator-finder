<script lang="ts">
    import "$modules/hako-ui/hako.css";
    import "$/app.css";
    import BlindOnly from "$lib/App/BlindOnly.svelte";
    import BlindOnlyLink from "$lib/App/BlindOnlyLink.svelte";
    import Navigation from "$lib/App/Navigation.svelte";
    import HakoOptions from "$modules/hako-ui/HakoOptions.svelte";
    import Hako from "$modules/hako-ui/Hako.svelte";
</script>

<HakoOptions>
    <div id="layout">
        <BlindOnlyLink href="#main-start">go to the main content</BlindOnlyLink>
        <header>
            <HakoOptions borderOptions={{ radius: "0" }}>
                <Hako />
            </HakoOptions>
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
            <BlindOnly id="main-start">Start of the main content.</BlindOnly>
            <slot />
        </main>

        <footer>
            Footer
            <a href="#main-start" aria-label="go back to the main content">Go Top</a>
        </footer>
    </div>
</HakoOptions>

<style>
    #layout {
        background: var(--h-color-mode);
        color: var(--h-color-mode-inverse);
        font-size: 1.5em;
    }
    header {
        font-size: clamp(0.9em, 5vw, 1.25em);
        padding: var(--h-padding);

        display: flex;
        flex-wrap: wrap;
        --center-at: 20rem;
        justify-items: center;
        gap: 1em;
        background: var(--h-color-mode);

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
