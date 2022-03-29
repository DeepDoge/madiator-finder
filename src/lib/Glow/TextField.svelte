<script lang="ts">
    import { v4 as uuid } from "@lukeed/uuid";
    import Border from "./Border.svelte";

    export let label: string = null;
    export let placeholder = null;
    export let value: string = null;

    let id = uuid();
</script>

<div class="text-field">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <div class="input">
        <Border>
            <input {id} type="text" bind:value {placeholder} />
        </Border>
        <slot name="append-after-input"></slot>
    </div>
</div>

<style>
    .text-field {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 0.5em;
    }

    label {
        cursor: pointer;
        font-weight: bold;
    }

    .input {
        display: flex;
        gap: .25em;
    }

    input {
        border: none;
        width: 100%;
        padding: 0.75em;
        background-color: transparent;
        color: currentColor;
        font-size: inherit;
    }

    input::placeholder
    {
        color: currentColor;
    }

    input:focus {
        outline: none;
    }
</style>
