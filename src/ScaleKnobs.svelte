<style>
  .root {
    @apply p-4 pt-3 -mx-4 my-4 border-t-4 border-b-4 border-gray-900;
  }
</style>

<script>
  import ControlGroup from "./ControlGroup.svelte";
  import ScaleSelector from "./ScaleSelector.svelte";
  import RangeField from "./RangeField.svelte";
  import EaseControl from "./EaseControl.svelte";
  import { scaleParams, config } from "./store";

  let current = 0;

  $: current = $scaleParams.scaleIndex;
</script>

<div class="root">
  <ScaleSelector />
  <ControlGroup title="Hue" noBorderTop>
    <RangeField
      id="hue-start"
      label="Start"
      bind:value="{$scaleParams.params[current].hue.start}"
      min="{$config.limits.hue[0]}"
      max="{$config.limits.hue[1]}"
      step="{$config.resolution}"
      variant="hue" />
    <RangeField
      id="hue-end"
      label="End"
      bind:value="{$scaleParams.params[current].hue.end}"
      min="{$config.limits.hue[0]}"
      max="{$config.limits.hue[1]}"
      step="{$config.resolution}"
      variant="hue" />

    <EaseControl
      id="hue-ease"
      bind:value="{$scaleParams.params[current].hue.ease}" />
  </ControlGroup>

  <ControlGroup title="Saturation">
    <RangeField
      id="sat-start"
      label="Start"
      bind:value="{$scaleParams.params[current].sat.start}"
      min="{$config.limits.sat[0]}"
      max="{$config.limits.sat[1]}"
      step="{$config.resolution}" />

    <RangeField
      id="sat-end"
      label="End"
      bind:value="{$scaleParams.params[current].sat.end}"
      min="{$config.limits.sat[0]}"
      max="{$config.limits.sat[1]}"
      step="{$config.resolution}" />

    <EaseControl
      id="sat-ease"
      bind:value="{$scaleParams.params[current].sat.ease}" />
    <RangeField
      id="sat-rate"
      label="Rate"
      bind:value="{$scaleParams.params[current].sat.rate}"
      min="{$config.limits.rate[0]}"
      max="{$config.limits.rate[1]}" />
  </ControlGroup>

  <ControlGroup title="Lightness">
    <RangeField
      id="lig-start"
      label="Start"
      bind:value="{$scaleParams.params[current].lig.start}"
      min="{$config.limits.lig[0]}"
      max="{$config.limits.lig[1]}"
      step="{$config.resolution}" />

    <RangeField
      id="lig-end"
      label="End"
      bind:value="{$scaleParams.params[current].lig.end}"
      min="{$config.limits.lig[0]}"
      max="{$config.limits.lig[1]}"
      step="{$config.resolution}" />
    <EaseControl
      id="lig-ease"
      bind:value="{$scaleParams.params[current].lig.ease}" />
  </ControlGroup>
</div>
