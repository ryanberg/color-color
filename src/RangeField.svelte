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
    background: var(--track-hue-gradient);
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

  input[type="range"][variant="hue"] {
    --track-hue-hsluv: linear-gradient(
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

    --track-hue-hsl: linear-gradient(
      to right,
      hsla(0, 100%, 50%, 1),
      hsla(10, 100%, 50%, 1),
      hsla(20, 100%, 50%, 1),
      hsla(30, 100%, 50%, 1),
      hsla(40, 100%, 50%, 1),
      hsla(50, 100%, 50%, 1),
      hsla(60, 100%, 50%, 1),
      hsla(70, 100%, 50%, 1),
      hsla(80, 100%, 50%, 1),
      hsla(90, 100%, 50%, 1),
      hsla(100, 100%, 50%, 1),
      hsla(110, 100%, 50%, 1),
      hsla(120, 100%, 50%, 1),
      hsla(130, 100%, 50%, 1),
      hsla(140, 100%, 50%, 1),
      hsla(150, 100%, 50%, 1),
      hsla(160, 100%, 50%, 1),
      hsla(170, 100%, 50%, 1),
      hsla(180, 100%, 50%, 1),
      hsla(190, 100%, 50%, 1),
      hsla(200, 100%, 50%, 1),
      hsla(210, 100%, 50%, 1),
      hsla(220, 100%, 50%, 1),
      hsla(230, 100%, 50%, 1),
      hsla(240, 100%, 50%, 1),
      hsla(250, 100%, 50%, 1),
      hsla(260, 100%, 50%, 1),
      hsla(270, 100%, 50%, 1),
      hsla(280, 100%, 50%, 1),
      hsla(290, 100%, 50%, 1),
      hsla(300, 100%, 50%, 1),
      hsla(310, 100%, 50%, 1),
      hsla(320, 100%, 50%, 1),
      hsla(330, 100%, 50%, 1),
      hsla(340, 100%, 50%, 1),
      hsla(350, 100%, 50%, 1),
      hsla(360, 100%, 50%, 1)
    );
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

  $: trackColor =
    variant === "hue"
      ? `--track-hue-gradient: var(--track-hue-${$settings.colorSpace});`
      : "";

  $: thumbColor =
    variant === "hue"
      ? `--thumb-color: ${hslToHex(value, 100, 50, $settings.colorSpace)};`
      : "";

  $: style = `${trackColor} ${thumbColor}`;

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
