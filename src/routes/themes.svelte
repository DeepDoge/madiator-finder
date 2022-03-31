<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import GlowBox from "$lib/GlowUI/GlowBox.svelte";

    import Sheet from "$lib/GlowUI/Sheet.svelte";

    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";

    let themes = ["default", "mono-light", "mono-dark", "master", "slave"] as const;
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
            <div class="theme g-theme-no-glow g-theme-{theme}">
                {theme} [no glow]
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
        gap: .5em;
    }
</style>
