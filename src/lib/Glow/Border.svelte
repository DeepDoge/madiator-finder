<div class="border">
    <slot />
</div>

<style>
    .border {
        width: 100%;
        height: 100%;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        --border-radius: var(--g-border-radius);
        border-radius: var(--border-radius);

        --size: 0.15em;
        padding: var(--size);
    }

    .border::after {
        content: "";
        position: absolute;
        inset: var(--size);
        background-color: var(--g-background-color);
        border-radius: var(--border-radius);
        z-index: -1;
        transition: var(--g-transition);
        transition-property: filter;
    }

    .border::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--g-border-color);
        z-index: -1;
        border-radius: var(--border-radius);
        transition: var(--g-transition);
        transition-property: filter;
        opacity: .9;
    }

    .border:hover::before,
    .border:focus-within::before {
        filter: brightness(1.3) opacity(.9);
    }

    .border:hover::after,
    .border:focus-within::after {
        filter: opacity(.98);
    }
</style>
