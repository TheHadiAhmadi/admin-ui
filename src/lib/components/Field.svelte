<script lang="ts">
	import { TextArea, TextField, DatePicker, Select } from "plantir-uikit";

    let {value = $bindable(), field, lang } = $props() as any
</script>

{#if field.type === 'string'}
    {#if field.input !== 'textarea'}
    <TextField label={lang[field.key]} placeholder={lang[field.key + '_placeholder']} bind:value />
    {:else}
        <TextArea label={lang[field.key]} placeholder={lang[field.key + '_placeholder']} bind:value />

    {/if}
{:else if field.type === 'select'}
    <Select label={lang[field.key]} items={field.items.map(item => ({title: lang[field.key + '_' + item], value: item}))} placeholder={lang[field.key + '_placeholder']} bind:value/>
{:else if field.type === 'date'}
    <!-- TODO: Fix datepicker label -->
    <DatePicker placeholder={lang[field.key + '_placeholder']} bind:value>
        <svelte:fragment slot="label">{lang[field.key]}</svelte:fragment>
    </DatePicker>

{:else}
    <TextField label="TODO({field.type}) {field.label}" bind:value />
{/if}