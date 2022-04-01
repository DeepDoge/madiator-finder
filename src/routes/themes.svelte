<script lang="ts">
    import Sheet from "$lib/GlowUI/Sheet.svelte";
    import Row from "$lib/Row/Row.svelte";

    const themes = ["wild", "mono", "master", "slave"] as const;
    const colorThemes = ["dark", "light"] as const;
</script>

<div class="themes">
    {#each colorThemes as colorMode}
        {colorMode}
        <div class="box-inner">
            <Row idealSize="20em" gap="1em">
                {#each themes as theme}
                    <div class="theme">
                        {theme}
                        <Sheet {theme} border glow rounded>
                            <div class="stuff">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                <Sheet rounded border>
                                    <div class="stuff">
                                        Lorem ipsum dolor sit amet consectetur adipisicing
                                        <Sheet rounded border>
                                            <div class="stuff">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                                        </Sheet>
                                    </div>
                                </Sheet>
                            </div>
                        </Sheet>
                    </div>
                {/each}
            </Row>
        </div>
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

    .stuff {
        padding: 1em;
    }

    .box-inner {
        padding: 1em;
    }
</style>
