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
    <input {id} type="text" bind:value {placeholder} />
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
        background-color: var(--g-foreground-color);
        color: var(--g-text-color);
        padding: 0.75em;

        min-width: 0;
        border-radius: var(--g-border-radius);

        font-size: inherit;
    }

    input:focus {
        outline: solid .1em var(--g-primary-color);
        background-color: var(--g-background-color);
    }
</style>
