<script lang="ts">
    export let id: string = null
</script>

<div {id} class="blind-only" tabindex="0">
    <slot />
</div>

<style>
    .blind-only {
        position: absolute;
        background: var(--h-color-mode);
        outline: solid 0.1em var(--h-color-master);
        z-index: 999999999999;
    }

    .blind-only {
        pointer-events: none;
        opacity: 0;
    }

    .blind-only:focus,
    .blind-only:focus-within {
        pointer-events: unset;
        opacity: unset;
    }
</style>
