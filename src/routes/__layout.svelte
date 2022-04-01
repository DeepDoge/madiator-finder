<script lang="ts">
import App from "$lib/GlowUI/App.svelte";

    import Sheet from "$lib/GlowUI/Sheet.svelte";
    import "$lib/GlowUI/style.css";

    interface NavItem {
        title: string;
        route: string;
    }

    const navItems: NavItem[] = [];
</script>

<App colorMode="dark" theme="wild">
    <header>
        <nav title="Top Navigation">
            <ul>
                {#each navItems as navItem}
                    <li>
                        <a href={navItem.route}>{navItem.title}</a>
                    </li>
                {/each}
            </ul>
        </nav>
    </header>

    <main>
        <slot />
    </main>

    <footer>Hey</footer>
</App>

<style>
    header {
        position: sticky;
        top: 0;
        padding: 1.25em 0.75em;
    }

    header::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--g-foreground-color);
        opacity: 0.75;
        box-shadow: 0 0 0.5rem 0 var(--g-foreground-color);
        z-index: -1;
    }

    main {
        min-height: 100vh;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
