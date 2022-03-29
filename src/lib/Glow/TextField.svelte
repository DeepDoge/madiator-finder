<script lang="ts">
    import { v4 as uuid } from "@lukeed/uuid";

    export let label: string = null;
    export let placeholder = null;
    export let value: string = null;

    let id = uuid();
</script>

<div class="text-field">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <label for={id} class="input-wrapper">
        <input {id} type="text" bind:value {placeholder} />
    </label>
</div>

<style>
    .text-field {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: .5em;
    }

    label {
        cursor: pointer;
    }

    input {
        border: none;
        width: 100%;
        background-color: transparent;
        color: var(--g-text-color);
        font-size: inherit;
    }

    input:focus {
        outline: none;
    }

    .input-wrapper {
        position: relative;
        padding: 0.75em;
        cursor: text;
        --border-radius: var(--g-border-radius);
        border-radius: var(--border-radius);
    }

    .input-wrapper::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--g-foreground-color);
        z-index: -1;
        border-radius: var(--border-radius);
    }

    .input-wrapper::before {
        content: "";
        position: absolute;
        inset: -.15em;
        background: var(--g-crazy-color);
        z-index: -1;
        border-radius: var(--border-radius);
        transition: var(--g-transition);
        transition-property: inset;
    }

    .input-wrapper:not(:focus-within)::before
    {
        inset: 0
    }
</style>
