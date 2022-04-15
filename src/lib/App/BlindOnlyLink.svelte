<script lang="ts">
    export let href: string
</script>

<a {href} class="blind-only-link" tabindex="0">
    <slot />
</a>

<style>
    .blind-only-link {
        position: absolute;
        background: var(--color-mode);
        outline: solid 0.1em var(--color-master);
        z-index: 999999999999;
    }

    .blind-only-link {
        pointer-events: none;
        opacity: 0;
    }

    .blind-only-link:focus,
    .blind-only-link:focus-within {
        pointer-events: unset;
        opacity: unset;
    }
</style>
