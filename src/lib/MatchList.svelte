<script lang="ts">
  export let list: RegExpMatchArray[];
  let groups: [string, string][] | null | undefined;
  $: groups = list
    .flatMap((l) => (l.groups ? Object.entries(l.groups) : []))
    .filter((v) => !!v);

  $: matches = list.flatMap((match) =>
    match.map((m) => (m.length === 0 ? "Empty string" : m))
  );
</script>

<div>
  <div>Matches:</div>
  {#each matches as item}
    <span class="match">{item}</span>
  {/each}

  {#if matches.length == 0}
    <span>No matches</span>
  {/if}

  <div>Groups:</div>
  {#if groups}
    {#each groups as [name, value]}
      <div class="group">
        <span class="name">{name}</span>
        <span class="value">{value}</span>
      </div>
    {/each}
    {#if groups.length == 0}
      <span>No matches</span>
    {/if}
  {:else}
    <span>No matches</span>
  {/if}
</div>

<style>
  .match {
    display: inline-block;
    padding: 4px 16px;
    margin: 4px;
    border-radius: 16px;
    background-color: #444;
  }

  .group {
    display: inline-block;
    padding: 4px 4px 4px 16px;
    border-radius: 16px;
    background-color: #333;
    margin: 4px;
  }

  .group .value {
    display: inline-block;
    background-color: #444;
    padding: 1px 8px;
    border-radius: 16px;
  }
</style>
