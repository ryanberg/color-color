<style>
  .index {
    @apply grid pb-4;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
    grid-gap: 0.25rem;
  }

  .index > li {
  }

  .index-marker {
    @apply flex justify-center items-center;
    @apply h-8 w-8;
    @apply border-2 border-gray-600 rounded-full;
    @apply text-gray-600 font-bold no-underline;
  }

  .index-marker--active {
    @apply relative border-gray-900 text-gray-100 bg-gray-900;
  }

  .index-marker--active::before {
    @apply hidden absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";

    @screen md {
      display: block;
    }
  }
</style>

<script>
  import { scaleParams } from "./store";
  let scaleIndex = [];
  $: scaleIndex = $scaleParams.params.map((_, i) => i);
</script>

<ul class="index">
  {#each scaleIndex as pi, i (i)}
    <li>
      <a
        class="index-marker"
        class:index-marker--active="{$scaleParams.scaleIndex === i}"
        href="#{i + 1}"
        on:click|preventDefault="{() => {
          $scaleParams.scaleIndex = i;
        }}">
        {i + 1}
      </a>
    </li>
  {/each}
</ul>
