<script>
  import { scaleParams } from "./store";
  import ControlGroup from "./ControlGroup.svelte";
  import RangeField from "./RangeField.svelte";
</script>

<ControlGroup title="Steps" titleId="steps-title">
  <RangeField
    id="steps-range"
    labelledby="steps-title"
    bind:value="{$scaleParams.steps}"
    min="3"
    max="21" />
</ControlGroup>
