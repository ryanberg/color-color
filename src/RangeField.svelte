<style>
  .root {
    @apply py-2;
  }

  .label {
    @apply block text-sm text-gray-700;
  }

  .wrapper {
    @apply flex items-center;
  }
  .input {
    @apply block w-full;
  }

  .value {
    @apply flex-none w-10 text-right;
  }
</style>

<script>
  export let id;
  export let label = null;
  export let labelledby = null;
  export let value;
</script>

<div class="root">
  {#if label}
    <label class="label" for="{id}">{label}</label>
  {/if}
  <div class="wrapper">
    <input
      type="range"
      aria-labelledby="{labelledby}"
      class="input"
      {id}
      bind:value
      {...$$restProps} />
    <div class="value">{value}</div>
  </div>
</div>