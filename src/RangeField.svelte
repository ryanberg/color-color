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

  .input-wrapper {
    @apply relative w-full;
  }

  .input {
    @apply block w-full appearance-none bg-transparent;
  }

  .track {
    @apply h-2 m-0 w-full bg-gray-600 cursor-pointer;
  }
  .track--hue {
    background: linear-gradient(
      to right,
      rgb(234, 0, 100),
      rgb(214, 68, 0),
      rgb(175, 101, 0),
      rgb(152, 112, 0),
      rgb(134, 120, 0),
      rgb(113, 126, 0),
      rgb(81, 133, 0),
      rgb(0, 138, 50),
      rgb(0, 136, 96),
      rgb(0, 134, 116),
      rgb(0, 133, 131),
      rgb(0, 131, 145),
      rgb(0, 129, 164),
      rgb(0, 124, 197),
      rgb(93, 99, 255),
      rgb(177, 44, 255),
      rgb(207, 0, 219),
      rgb(218, 0, 184),
      rgb(226, 0, 149),
      rgb(234, 0, 100)
    );
  }

  input[type="range"]::-webkit-slider-runnable-track {
    @apply track;
  }

  input[type="range"]::-moz-range-track {
    @apply track;
  }

  input[type="range"]::-ms-track {
    @apply track;
    @apply text-transparent;
  }

  input[type="range"][variant="hue"]::-webkit-slider-runnable-track {
    @apply track--hue;
  }

  input[type="range"][variant="hue"]::-moz-range-track {
    @apply track--hue;
  }

  input[type="range"][variant="hue"]::-ms-track {
    @apply track--hue;
  }

  input[type="range"]::-ms-fill-lower {
    @apply bg-transparent;
  }

  .thumb {
    @apply appearance-none h-6 w-3 bg-gray-200 border-2 border-solid border-gray-900;
  }

  .thumb--hue {
    background: var(--thumb-color);
  }

  input[type="range"]::-webkit-slider-thumb {
    @apply thumb -mt-2;
  }

  input[type="range"]::-moz-range-thumb {
    @apply thumb;
    @apply mt-0 rounded-none;
  }

  input[type="range"]::-ms-thumb {
    @apply thumb;
    @apply mt-0 rounded-none;
  }

  input[type="range"][variant="hue"]::-webkit-slider-thumb {
    @apply thumb--hue;
  }

  input[type="range"][variant="hue"]::-moz-range-thumb {
    @apply thumb--hue;
  }

  input[type="range"][variant="hue"]::-ms-thumb {
    @apply thumb--hue;
  }

  .value {
    @apply flex-none w-16 text-right;
  }

  .shortValue {
    @apply w-10;
  }
</style>

<script>
  import { hslToHex } from "./lib/colors";
  import { settings } from "./store";

  export let id;
  export let label = null;
  export let labelledby = null;
  export let value;
  export let step = 1;
  export let variant = null;
  export let style = "";

  let shortValue = false;

  $: style =
    variant === "hue"
      ? `--thumb-color: ${hslToHex(value, 100, 50, settings.colorSpace)}`
      : "";

  $: shortValue = step === 1;
  $: valueText = shortValue ? value : value.toFixed(2);
</script>

<div class="root">
  {#if label}<label class="label" for="{id}">{label}</label>{/if}
  <div class="wrapper">
    <div class="input-wrapper">
      <input
        type="range"
        aria-labelledby="{labelledby}"
        class="input"
        id="{id}"
        step="{step}"
        variant="{variant}"
        style="{style}"
        bind:value
        {...$$restProps} />
    </div>
    <div class="value" class:shortValue>{valueText}</div>
  </div>
</div>
