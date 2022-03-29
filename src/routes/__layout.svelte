<script lang="ts">
import GlowApp from "$lib/Glow/GlowApp.svelte"

    interface NavItem {
        title: string
        route: string
    }

    const navItems: NavItem[] = [

    ]
</script>

<header>
    <nav title="Top Navigation">
        <ul>
            {#each navItems as navItem}
                <li><a href={navItem.route}>{navItem.title}</a></li>
            {/each}
        </ul>
    </nav>
</header>

<main>
    <GlowApp>
        <slot></slot>
    </GlowApp>
</main>

<footer>
    Hey
</footer>