<style>
  .header {
    grid-area: var(--grid-area);
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .title a {
    @apply block px-2 py-4 no-underline text-gray-100 bg-gray-900;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    @apply underline cursor-pointer;
  }

  .button-set {
    @apply flex;
  }

  button {
    @apply flex-1 items-center p-2 border-4 border-gray-900;
    @apply leading-tight font-bold;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  button + button {
    @apply -ml-1;
  }

  button[disabled] {
    @apply line-through;
  }

  button[disabled]:hover,
  button[disabled]:active,
  button[disabled]:focus {
    @apply bg-transparent;
    @apply cursor-not-allowed;
  }
</style>

<script>
  import { scaleParams, shareDialog } from "./store";
  export let gridArea;

  $: canAddMoreColors =
    $scaleParams.params.length < $scaleParams.maxNumOfScales;
</script>

<header class="header" style="--grid-area:{gridArea};">
  <h1 class="title">
    <a href="/"> color <span aria-hidden="true">×</span> color </a>
  </h1>
  <div class="button-set">
    <button
      on:click="{() => {
        $shareDialog = !$shareDialog;
      }}">
      Share
    </button>
    <button on:click="{() => scaleParams.add()}" disabled="{!canAddMoreColors}">
      Add scale
    </button>
  </div>
</header>
