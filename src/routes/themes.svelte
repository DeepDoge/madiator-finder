<script lang="ts">
    import Sheet from "$lib/GlowUI/Box.svelte";
    import Row from "$lib/Row/Row.svelte";

    const themes = ["wild", "mono", "master", "slave"] as const;
    const colorThemes = ["dark", "light"] as const;
</script>

<div class="themes">
    {#each colorThemes as colorMode}
        {colorMode}
        <div class="box-inner g-color-mode-{colorMode}">
            <Row idealSize="20em" gap="1em">
                {#each themes as theme}
                    <div class="theme">
                        {theme}
                        <Sheet {theme} glow rounded>
                            <div class="stuff">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                <Sheet rounded>
                                    <div class="stuff">
                                        Lorem ipsum dolor sit amet consectetur adipisicing
                                        <Sheet rounded>
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

<Sheet theme="mono">
    <div class="stufff">
        <Sheet glow theme="wild">
            <div class="stuff">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci suscipit placeat repellendus repudiandae esse asperiores doloribus dignissimos deleniti eaque veniam non alias molestiae error nisi cumque, at ea provident! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quaerat aut adipisci asperiores natus voluptates dolore quasi molestiae fuga optio ex beatae, error, officiis distinctio sed, perspiciatis tempora? Obcaecati, natus!</div>
        </Sheet>
    </div>
</Sheet>

<style>
    .themes {
        display: grid;
        grid-auto-flow: row;
        gap: 1em;
        padding: 1em;
    }

    .theme {
        width: 100%;
        display: grid;
        grid-auto-flow: row;
        gap: 0.5em;
    }

    .stuff {
        padding: 1.5em;
    }
    .stufff {
        padding: 5em;
    }

    .box-inner {
        padding: 1em;
    }
</style>
