<script lang="ts">
    import { page } from "$app/stores";

    interface Item {
        label: string;
        pathname: string;
    }
    export let name: string;
    export let items: Item[];
</script>

<nav {name}>
    <ul>
        {#each items as item}
            <li>
                <a href={item.pathname} class:selected={$page.url.pathname === item.pathname}>{item.label}</a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav ul {
        margin: 0;
        padding: 0;
        list-style: none;

        display: flex;
        height: 100%;
        align-items: center;
        justify-content: stretch;
        flex-wrap: wrap;
        word-wrap: break-word;

        font-weight: bold;

        gap: 1em
    }

    a {
        display: inline-block;
    }

    a.selected {
        color: var(--color-master)
    }

    a::after {
        content: "";
        display: block;
        background: var(--color-gradient-1);
        height: .1em;
    }

    a:not(.selected)::after {
        visibility: hidden;
    }
</style>
