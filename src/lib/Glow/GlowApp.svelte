<script lang="ts">
    const light = false;
</script>

<div id="glow-app" class:g-theme-light={light}>
    <slot />
</div>

<style>
    :global(:root) {
        font-size: max(1rem, min(1vw, 2vh));
        font-family: Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;

        box-sizing: border-box;

        --g-box-shadow: 0 0px 5px 0 rgb(0 0 0 / 12%);
        --g-border-radius: 0.25rem;
        --g-transition: linear .1s;

        --g-primary-color: #537de0;
        --g-crazy-color: linear-gradient(30deg, var(--g-primary-color), purple, var(--g-primary-color));

        --g-body-color: #272a31;
        --g-background-color: #212429;
        --g-foreground-color: #31343c;
        --g-text-color: #979da6;
    }

    :global(.g-theme-light) {
        --g-primary-color: #537de0;

        --g-body-color: #272a31;
        --g-background-color: #212429;
        --g-foreground-color: #31343c;
        --g-text-color: #979da6;
    }

    :global(body) {
        background-color: var(--g-body-color);
        color: var(--g-text-color);
    }

    :global(::-webkit-scrollbar) {
        display: block;
    }

    :global(::-webkit-scrollbar-track) {
        background: var(--g-body-color);
    }

    :global(::-webkit-scrollbar-thumb) {
        background: var(--g-background-color);
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: var(--g-foreground-color);
    }

    :global(h1),
    :global(h2),
    :global(p) {
        font-weight: 400;
        margin: 0;
    }

    :global(img) {
        display: block;
        max-width: 100%;
    }

    :global(p) {
        line-height: 1.5;
    }

    :global(a) {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
