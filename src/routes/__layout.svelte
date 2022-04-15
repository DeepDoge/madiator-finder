<script lang="ts">
    import "$/app.css";
import Navigation from "$lib/App/Navigation.svelte";
</script>

<div id="layout">
    <header>
        <h1><a href="/" alt="Main Page">Madiator Finder</a></h1>
        <Navigation name="Main Navigation" items={[
            {
                label: 'Search',
                pathname: '/'
            },
            {
                label: 'Leaderboard',
                pathname: '/leaderboard'
            }
        ]}></Navigation>
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
        position: sticky;
        top: 0;
        inset: 0;
        bottom: unset;
        padding: 0.75em;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        --center-at: 20rem;
        justify-items: center;
        gap: 1em;
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
    }


    main {
        min-height: 100vh;
    }
</style>
