<script lang="ts" context="module">
    import { request } from "$/plugins/common/api";
    import type { getCountersRequest } from "$/routes/api/v1/counters";
    import Row from "$lib/Row/Row.svelte";
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";
    import BlindOnly from "./BlindOnly.svelte";

    let counters: Writable<typeof getCountersRequest["TYPE"]["OUT"]> = writable(null);
    export async function updateCounters() {
        counters.set(await request<typeof getCountersRequest>("/v1/counters", {}));
    }
    async function task() {
        while (true) {
            await updateCounters();
            await new Promise((r) => setTimeout(r, 20000));
        }
    }
    task();
</script>

<script lang="ts">
</script>

<div class="counters">
    <BlindOnly>
        number of videos and channels we have on our database
    </BlindOnly>
    <Row type="fit" idealSize="10em">
        <div class="counter">Videos: {$counters?.videos ?? "..."}</div>
        <div class="counter">Channels: {$counters?.channels ?? "..."}</div>
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
