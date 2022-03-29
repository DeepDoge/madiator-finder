<script lang="ts">
    import Border from "./Border.svelte";

    export let type: "button" | "submit" = "button";
    export let text: string;
    export let _id: string = null
</script>

<Border>
    <input id={_id} {type} value={text} on:click />
</Border>

<style>
    input {
        appearance: none;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        color: currentColor;
        font-weight: bold;
        font-size: inherit;
        padding: .5em .75em;
    }
</style>
