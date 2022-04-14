<script lang="ts">
    import { request } from "$/plugins/common/api";

    import type { getCountersRequest } from "$/routes/api/v1/counters";

    import Row from "$lib/Row/Row.svelte";
import { onDestroy, onMount } from "svelte";

    let counters: typeof getCountersRequest["TYPE"]["OUT"] = null;

    async function update() {
        counters = await request<typeof getCountersRequest>("/v1/counters", {});
    }

    let interval: NodeJS.Timeout;
    onMount(() => 
    {
        update()
        interval = setInterval(update, 20000)
    })
    onDestroy(() => clearInterval(interval))
</script>

<div class="counters">
    <Row type="fit" idealSize="10em">
        <div class="counter">Videos: {counters?.videos ?? '...'}</div>
        <div class="counter">Channels: {counters?.channels ?? '...'}</div>
    </Row>
</div>

<style>
    .counters {
        width: min(100%, 40em);
        padding: 1em;
        text-align: center;
        letter-spacing: clamp(0.5ch, 0.5vw, 0.75ch);
    }
</style>
