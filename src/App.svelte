<script lang="ts">
  import ErrorMessage from "./lib/ErrorMessage.svelte";
  import MatchList from "./lib/MatchList.svelte";
  import type { TError } from "./lib/types";

  type TFlags = Record<"g" | "i" | "m", boolean>;

  let errors: TError[] = [];

  let regex = "";
  let text = "";
  const flags: TFlags = {
    g: false,
    i: false,
    m: false,
  };

  let list: RegExpMatchArray[] = [];

  $: console.log(list);

  function handleRegEx() {
    errors = [];
    let result: RegExpMatchArray[] = [];
    const rg = checkRegExp();
    if (!checkText()) {
      return;
    }

    if (!rg) {
      return;
    }

    if (rg.global) {
      result = Array.from(text.matchAll(rg));
    } else {
      const r = text.match(rg);
      if (r) {
        result = [r];
      }
    }

    if (result.length == 0) {
      errors = [...errors, "NoMatches"];
    }
    list = result;
  }

  function checkRegExp(): RegExp | undefined {
    if (regex === "") {
      errors = [...errors, "RegExpEmpty"];
      return;
    }
    try {
      return RegExp(regex, joinFlags(flags));
    } catch (error) {
      errors = [...errors, "RegExpSyntax"];
    }
  }

  function checkText(): boolean {
    if (text === "") {
      errors = [...errors, "TextEmpty"];
      return false;
    } else {
      return true;
    }
  }

  function joinFlags(flags: TFlags): string {
    return Object.entries(flags)
      .filter(([_, value]) => value)
      .map(([name]) => name)
      .join("");
  }
</script>

<div class="input_block column">
  <input type="text" placeholder="RegExp" bind:value={regex} />

  <textarea placeholder="Text" bind:value={text} />
  <button on:click={handleRegEx}>Run</button>
  <ErrorMessage {errors} />

  <div class="column">
    <span>Flags:</span>
    <label>
      <input type="checkbox" bind:checked={flags.g} />
      Global
    </label>
    <br />
    <label>
      <input type="checkbox" bind:checked={flags.i} />
      Ignore case
    </label>
    <br />
    <label>
      <input type="checkbox" bind:checked={flags.m} />
      Multiline
    </label>
  </div>
  <MatchList {list} />
</div>

<style>
  .input_block {
    gap: 8px;
  }
</style>
