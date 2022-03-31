<script lang="ts">
    import Button from "$lib/GlowUI/Button.svelte";
    import GlowBox from "$lib/GlowUI/GlowBox.svelte";

    import Sheet from "$lib/GlowUI/Sheet.svelte";

    import TextField from "$lib/GlowUI/TextField.svelte";
    import Row from "$lib/Row/Row.svelte";

    const themes = ["default", "mono", "master", "slave"] as const;
    const colorThemes = ['light', 'dark'] as const
</script>

<div class="themes">
    {#each colorThemes as colorMode}
    <GlowBox {colorMode}>
        <div class="box-inner g-theme-inverted">
            <Row idealSize="20em" gap="1em">
                {#each themes as theme}
                    <div class="theme g-theme-{theme}">
                        {theme}
                        <TextField value="Text Field" />
                        <Sheet>Sheet</Sheet>
                        <GlowBox>Box</GlowBox>
                        <Button>Button</Button>
                        <Button text>Text Button</Button>
                    </div>
                {/each}
            </Row>
        </div>
    </GlowBox>    
    {/each}
</div>

<style>
    .themes {
        display: grid;
        grid-auto-flow: row;
        gap: 2em;
        padding: 2em;
    }

    .theme {
        width: 100%;
        display: grid;
        grid-auto-flow: row;
        gap: 0.5em;
    }

    .box-inner {
        padding: 1em;
    }
</style>
