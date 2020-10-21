<style>
  .control {
    @apply py-2;
  }

  .label {
    @apply block text-base mb-2 text-gray-700;
  }

  .input {
    @apply block appearance-none w-full bg-white border-2 border-gray-500 rounded-none text-gray-700 p-2 leading-tight;
  }

  .input:focus {
    @apply border-gray-900;
  }

  .input--textarea {
    @apply h-32 resize-none;
  }

  .legend {
    @apply mt-1 text-sm text-gray-700 leading-tight;
  }
</style>

<script>
  import { onMount } from "svelte";

  export let id;
  export let label = null;
  export let legend = null;
  export let labelledby = null;
  export let value;
  export let multiline = false;
  export let focusOnMount = false;
  export let ref = null;

  onMount(() => {
    if (focusOnMount === true) {
      ref.focus();
    }
  });
</script>

<div class="control">
  {#if label}<label class="label" for="{id}">{label}</label>{/if}
  {#if multiline}
    <textarea
      class="input input--textarea"
      id="{id}"
      bind:value
      aria-labelledby="{labelledby}"
      on:click
      bind:this="{ref}"
      focusOnMount="{focusOnMount}"
      {...$$restProps}></textarea>
  {:else}
    <input
      class="input"
      type="text"
      id="{id}"
      bind:value
      aria-labelledby="{labelledby}"
      on:click
      bind:this="{ref}"
      focusOnMount="{focusOnMount}"
      {...$$restProps} />
  {/if}
  {#if legend}
    <p class="legend">{legend}</p>
  {/if}
</div>
