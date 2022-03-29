<script lang="ts">
    import Border from "./Border.svelte";

    export let placeholder = null;
    export let value: string = null;
    export let required = false;
</script>

<Border>
    <input on:change {required} type="text" bind:value {placeholder} />
</Border>

<style>
    input {
        border: none;
        width: 100%;
        padding: 0.75em;
        background-color: transparent;
        color: currentColor;
        font-size: inherit;
    }

    input::placeholder {
        color: currentColor;
    }

    input:focus {
        outline: none;
    }
</style>
