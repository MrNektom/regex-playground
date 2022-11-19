<script lang="ts">
  import { classes } from "./classes";
  import type { TError } from "./types";

  export let errors: TError[] = [];
</script>

<div class={classes("message_block column", { empty: errors.length == 0 })}>
  {#if errors.includes("RegExpEmpty")}
    <span>RegExp is empty</span>
  {/if}

  {#if errors.includes("TextEmpty")}
    <span>Text is empty</span>
  {/if}

  {#if errors.includes("RegExpSyntax")}
    <span>Invalid regular expression syntax</span>
  {/if}

  {#if errors.includes("NoMatches")}
    <span>No matching text</span>
  {/if}
</div>

<style>
  .message_block {
    border: 1px solid red;
    background-color: #f002;
    border-radius: 16px;
    padding: 8px 16px;
  }

  .message_block.empty {
    display: none;
  }
</style>
