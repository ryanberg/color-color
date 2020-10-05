<style>
  .overlay {
    @apply absolute inset-0;
    @apply flex items-center justify-center;
    @apply bg-black bg-opacity-25;
    @apply z-10;
  }

  h2 {
    @apply p-4 text-lg font-bold mr-auto;
  }

  .dialog {
    @apply w-11/12 max-w-2xl;
    @apply border-4 border-gray-900 bg-gray-200;
    @apply shadow-lg;

    @screen md {
      @apply w-2/3;
    }
  }

  .header {
    @apply flex border-b-4 border-gray-900;
  }

  .content {
    @apply p-4;
  }

  button {
    @apply flex flex-auto items-center p-4 pt-3 text-gray-900;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  import { scaleParams, addDialog, hexToScale } from "./store.js";
  import ControlGroup from "./ControlGroup.svelte";
  import TextField from "./TextField.svelte";
  // import TinySwatch from "./TinySwatch.svelte";
  import Icon from "./Icon.svelte";

  // function selectText(e) {
  //   e.currentTarget.select();
  // }

  function closeModal(e) {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    $addDialog = !$addDialog;
  }

  function addScale() {
    scaleParams.add($hexToScale);
    closeModal();
  }

  $: canAddMoreColors =
    $scaleParams.params.length < $scaleParams.maxNumOfScales;
</script>

<div class="overlay">
  <div class="dialog">
    <div class="header">
      <h2>Add color scale</h2>
      <button title="Close" on:click="{closeModal}">
        <Icon icon="cross" size="lg" />
      </button>
    </div>
    <div class="content">
      <form
        on:submit="{(e) => {
          e.preventDefault();
        }}">
        <ControlGroup title="Hex value" titleId="hex-value">
          <TextField
            bind:value="{$hexToScale}"
            labelledby="hex-value"
            id="hex-value-input"
            legend=""
            placeholder=""
            max-length="7"
            style="width: 160px" />
        </ControlGroup>
        <button
          type="submit"
          title="Add scale"
          class="inline-block p-2 border-4 border-gray-900 text-gray-900
            font-bold no-underline"
          on:click="{addScale}"
          disabled="{!canAddMoreColors}">Add scale</button>
      </form>
    </div>
  </div>
</div>
