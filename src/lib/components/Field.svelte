<script lang="ts">
	import { TextField } from "plantir-uikit";

    let {value = $bindable(), field } = $props() as any
</script>

{#if field.type === 'string'}
    <TextField label={field.label} bind:value />
{:else}
    <TextField label="TODO({field.type}) {field.label}" bind:value />
{/if}