<script lang="ts">
    import "$/app.css";
    import BlindOnly from "$lib/App/BlindOnly.svelte";
    import BlindOnlyLink from "$lib/App/BlindOnlyLink.svelte";
    import Navigation from "$lib/App/Navigation.svelte";
    import "$lib/hako-ui/hako.css";
    import HakoOptions from "$lib/hako-ui/HakoOptions.svelte";
</script>

<HakoOptions>
    <div id="layout">
        <BlindOnlyLink href="#main-start">go to the main content</BlindOnlyLink>
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
        background: linear-gradient(to left top, var(--h-color-mode) 25%, rgba(72, 142, 119, 0.5));
        background-attachment: fixed;
        color: var(--h-color-mode-inverse);
        font-size: 1.5em;
    }

    header {
        --center-at: 20rem;
        font-size: clamp(0.9em, 5vw, 1.25em);
        line-height: 1.5;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        justify-items: center;
        gap: calc(var(--h-padding) * 2);
        padding: var(--h-padding);
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
