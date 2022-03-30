<script lang="ts">
    import "$lib/GlowUI/style.css"

    interface NavItem {
        title: string;
        route: string;
    }

    const navItems: NavItem[] = [
 
    ];
</script>

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

<style>
    :global(body::before) {
        content: "";
        position: fixed;
        inset: 0;
        background: var(--g-wild-color);
        z-index: -1;
        filter: blur(5rem) opacity(0.1);
    }

    header {
        position: sticky;
        top: 0;
        padding: 1.25em 0.75em;
    }

    header::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--g-background-color);
        opacity: 0.75;
        box-shadow: 0 0 0.5rem 0 var(--g-background-color);
        z-index: -1;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
