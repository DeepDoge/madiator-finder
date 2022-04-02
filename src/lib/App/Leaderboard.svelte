<script lang="ts">
    import type { prisma } from "$/plugins/prisma";
import Table from "$lib/GlowUI/Table.svelte";

    type T = ReturnType<typeof prisma.profile.findMany>;
    const rowsPromise: T = fetch("/api/v1/profile/leaderboard").then((value) => value.json()) as any;
</script>

<Table>
    <tr>
        <th>Nickname</th>
        <th>Score</th>
    </tr>
    {#await rowsPromise}
        ...
    {:then rows}
        {#each rows as row}
            <tr>
                <td>{row.nickname}</td>
                <td>{row.score}</td>
            </tr>
        {/each}
    {/await}
</Table>

<style>

</style>
