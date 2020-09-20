<style>
  .scales {
    @apply grid overflow-y-auto overflow-x-hidden;
    @apply border-4 border-l-0 border-gray-900;
    grid-template-columns: repeat(var(--columns), 1fr) max-content;
    grid-area: var(--grid-area);
    scroll-snap-align: start;

    @screen md {
      @apply overflow-x-auto;
    }
  }

  .ids {
    @apply flex flex-col;
  }

  .ids__header {
    @apply sticky top-0 z-10 h-16 flex-none flex bg-gray-200;
  }

  button {
    @apply flex flex-col flex-1 border-t px-2 py-3 text-gray-600;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  .button-label {
    @apply relative block px-3 py-1 font-bold bg-transparent rounded-full;
  }

  .button-label--active {
    @apply text-gray-200 bg-gray-900;
  }

  .button-label--active:after {
    @apply block absolute w-5 h-1 bg-gray-900;
    left: 100%;
    top: 50%;
    margin-top: -0.125rem;
    content: "";
  }
</style>

<script>
  import { scaleParams, scales } from "./store";
  import Scale from "./Scale.svelte";
  import Swatch from "./Swatch.svelte";

  export let gridArea;

  function confirmAndDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      scaleParams.removeByIndex(id);
    }
  }

  function setCurrentIndices(scaleIndex, swatchIndex) {
    $scaleParams.scaleIndex = scaleIndex;
    $scaleParams.swatchIndex = swatchIndex;
  }
</script>

<div
  class="scales"
  style="--grid-area: {gridArea}; --columns:{$scales.length};">
  {#each $scales as scale, j (j)}
    <Scale
      active="{$scaleParams.scaleIndex === j}"
      index="{j + 1}"
      on:clickActivate="{() => {
        $scaleParams.scaleIndex = j;
      }}"
      on:clickRemove="{() => {
        confirmAndDelete(j);
      }}"
      removable="{$scales.length > 1}">
      {#each scale as color, i (i)}
        <Swatch
          fillHeight
          hexCode="{color.hex}"
          on:click="{(e) => {
            e.preventDefault();
            setCurrentIndices(j, i);
          }}" />
      {/each}
    </Scale>
  {/each}
  <div class="ids">
    <div class="ids__header">&nbsp;</div>
    {#each $scales[0] as color, i (i)}
      <button
        on:click="{() => {
          $scaleParams.swatchIndex = i;
        }}">
        <span
          class="button-label"
          class:button-label--active="{$scaleParams.swatchIndex === i}">
          {color.id}
        </span>
      </button>
    {/each}
  </div>
</div>
