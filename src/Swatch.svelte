<style>
  .swatch {
    @apply relative flex flex-wrap justify-end items-start py-4 text-gray-300;
  }

  .click-area {
    color: inherit;
  }

  .click-area::after {
    @apply absolute inset-0;
    content: "";
  }

  .click-area:hover::after {
    border: 2px solid;
  }

  .isLight {
    @apply text-gray-700;
  }

  .fillHeight {
    @apply flex-1;
  }

  .hex-code,
  .w-contrast,
  .b-contrast,
  .refColor {
    @apply px-4 font-mono;
  }

  .hex-code,
  .w-contrast,
  .b-contrast {
    @apply relative;
  }

  .w-contrast {
    @apply text-white;
  }

  .b-contrast {
    @apply text-black;
  }

  .hex-code {
    @apply mr-auto;
  }
</style>

<script>
  import chroma from "chroma-js";
  import { settings, nearestRefColors } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";

  export let hexCode = "#000";
  export let fillHeight = false;
  export let stepId;
  export let textColors = {};

  let isLight = false;
  let whiteContrast = 0;
  let blackContrast = 0;
  let refColor;
  let whiteContrastAa;
  let whiteContrastAaLarge;
  let blackContrastAa;
  let blackContrastAaLarge;
  let textColor;

  $: isLight = chroma(hexCode).luminance() > 0.55;
  $: textColor = isLight ? textColors.dark : textColors.light;
  $: whiteContrast =
    $settings.overlayContrast && chroma.contrast("#fff", hexCode);
  $: blackContrast =
    $settings.overlayContrast && chroma.contrast("#000", hexCode);
  $: refColor = $nearestRefColors[hexCode];

  $: whiteContrastAa = whiteContrast >= 4.5;
  $: whiteContrastAaLarge = whiteContrast >= 3;
  $: blackContrastAa = blackContrast >= 4.5;
  $: blackContrastAaLarge = blackContrast >= 3;
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style="background-color:{hexCode}">
  <a class="click-area" href="#{hexCode}" on:click>
    <span class="sr-only">Select</span>
  </a>
  <div class="flex w-full my-auto pl-3">
    <div class="mr-auto pr-2 xl:pr-3" style="color: {textColor}">
      <div class="text-lg sm:text-xl leading-none font-bold mb-1">{stepId}</div>
      <div class="text-sm leading-none font-mono">{hexCode}</div>
    </div>

    <div class="w-15 xl:w-16 pr-2 xl:pr-3 flex-grow-0 flex-shrink-0 text-white">
      <div class="w-full text-lg sm:text-xl leading-none font-bold mb-1">
        {#if whiteContrastAaLarge}AA+{/if}
      </div>
      <div class="w-full text-sm leading-none">
        {#if whiteContrastAa}AA{/if}
      </div>
    </div>

    <div class="w-15 xl:w-16 pr-2 xl:pr-3 flex-grow-0 flex-shrink-0 text-black">
      <div class="w-full text-lg sm:text-xl leading-none font-bold mb-1">
        {#if blackContrastAaLarge}AA+{/if}
      </div>
      <div class="w-full text-sm leading-none">
        {#if blackContrastAa}AA{/if}
      </div>
    </div>
    {#if false}
      <span class=""></span>
      {#if $settings.overlayHex}<span class="hex-code"></span>{/if}
      {#if refColor}
        <div class="refColor">
          <TinySwatch color="{refColor}" />
        </div>
      {/if}
      {#if $settings.overlayContrast}
        <span class="b-contrast text-xs">{blackContrast.toFixed(2)}</span>
        <span class="w-contrast text-xs">{whiteContrast.toFixed(2)}</span>
      {/if}
    {/if}
  </div>
</div>
