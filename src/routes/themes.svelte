<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import GlowBox from "$lib/GlowUI/GlowBox.svelte";

    import Sheet from "$lib/GlowUI/Sheet.svelte";

    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";

    let themes = ["default", "wild", "mono", "master", "slave", "wild-filled", "wild-glow"] as const;
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
        grid-template-columns: repeat(auto-fill, 1fr);
        gap: 1em;
    }
</style>
