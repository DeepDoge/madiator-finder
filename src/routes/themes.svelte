<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import GlowBox from "$lib/GlowUI/GlowBox.svelte";

    import Sheet from "$lib/GlowUI/Sheet.svelte";

    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";

    let themes = ["default", "wild", "mono", "master", "slave"] as const;
</script>

<div class="themes">
    <Row idealSize="20em" gap="1em">
        {#each themes as theme}
            <div class="theme g-theme-{theme}">
                {theme}
                <TextField value="Text Field" />
                <Sheet>Sheet</Sheet>
                <GlowBox>Box</GlowBox>
                <Button text="Button" />
            </div>
            <div class="theme g-theme-filled g-theme-{theme}">
                {theme} [filled]
                <TextField value="Text Field" />
                <Sheet>Sheet</Sheet>
                <GlowBox>Box</GlowBox>
                <Button text="Button" />
            </div>
            <div class="theme g-theme-no-border g-theme-{theme}">
                {theme} [no border]
                <TextField value="Text Field" />
                <Sheet>Sheet</Sheet>
                <GlowBox>Box</GlowBox>
                <Button text="Button" />
            </div>
        {/each}
    </Row>
</div>

<style>
    .themes {
        padding: 2em;
    }

    .theme {
        width: 100%;
        display: grid;
        grid-auto-flow: row;
        gap: 2em;
    }
</style>
