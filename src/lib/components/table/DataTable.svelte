<script>
	import { getContext, onMount } from 'svelte';
	import Text from './Text.svelte';
	import TableColumn from './TableColumn.svelte';
	import {
		Table,
		Card,
		Dialog,
		Badge,
		DialogBody,
		DialogHeader,
		DialogFooter,
		DatePicker,
		Button,
		Icon,
		Range,
		TextField,
		Pagination,
		Dropdown,
		CheckboxGroup,
		Checkbox,
		Loading
	} from 'plantir-uikit';

	let { name, items, fields, lang, headerActions } = $props();

	let loading = $state(true);

	const filters = $state({});

	let columnsModalOpen = $state(false);
	let langCtx = getContext('lang');
	let allColumns = $state([]);
	let visibleColumns = $state([]);
	let visibleColumnsDraft = $state([]);

	let moreFilters = $state([]);

	function onSaveColumns() {
		columnsModalOpen = false;
		visibleColumns = visibleColumnsDraft;

		if (name) {
			localStorage.setItem('TABLE_COLUMNS_' + name, JSON.stringify(visibleColumns));
		}
	}

	function onColumnsClick() {
		columnsModalOpen = !columnsModalOpen;
		if (columnsModalOpen) visibleColumnsDraft = visibleColumns;
	}

	function onFilterRemoveClick(e, field) {
		e.stopPropagation();

		if (field.type == 'number') {
			filters[field.key].value = [field.min, field.max];
		} else if (field.type === 'select') {
			filters[field.key].value = [];
		} else if (field.type === 'date') {
			filters[field.key].value = [];
		} else {
			filters[field.key].value = '';
		}
	}

	function onMoreButtonClicked() {
		// moreFilters.push({})
		//
	}

	function filterHasValue(filters, field) {
		if (!filters[field.key]) return;
		if (field.type == 'number') {
			console.log(filters[field.key].value[0] > field.min, filters[field.key].value[1] < field.max);
			return filters[field.key].value[0] > field.min || filters[field.key].value[1] < field.max;
		} else if (field.type === 'select') {
			return filters[field.key].value?.length > 0;
		} else if (field.type === 'date') {
			return filters[field.key].value?.length > 0;
		} else {
			return filters[field.key].value;
		}
	}

	onMount(() => {
		if (!visibleColumns.length) {
			// get from localstorage

			let localStorageItems = localStorage.getItem('TABLE_COLUMNS_' + name);
			if (name && localStorageItems) {
				visibleColumns = JSON.parse(localStorageItems);
			} else {
				visibleColumns = fields.map((x) => x.key);
			}
		}
		allColumns = fields.map((x) => x.key);

		for (let field of fields) {
			filters[field.key] = {};
			if (field.type === 'number') {
				filters[field.key].value = [field.min, field.max];
			}
		}
		loading = false;
	});

	$inspect(filters, visibleColumns);
</script>

<Card>
	<div class="flex items-center justify-between p-4">
		<div class="flex flex-wrap items-center gap-2">
			{#each fields as field}
				<Dropdown placement="bottom-start">
					<div
						slot="toggler"
						class="flex cursor-pointer items-center gap-2 rounded-full hover:text-base-content border border-base-300 bg-base-200 px-4 py-1 hover:bg-base-300"
						class:bg-primary={filterHasValue(filters, field)}
						class:text-primary-content={filterHasValue(filters, field)}
						class:border-primary={filterHasValue(filters, field)}
					>   
						{lang[langCtx][field.key]}
						{#if filterHasValue(filters, field)}
							<Icon onclick={(e) => onFilterRemoveClick(e, field)} name="CancelMajor" />
						{/if}
					</div>
					<div class="w-full">
						{#if filters[field.key]}
							{#if field.type == 'select'}
								<CheckboxGroup bind:value={filters[field.key].value} inline column>
									{#each field.items as item}
										<Checkbox
											checked={filters[field.key].value.includes(item)}
											value={item}
											label={lang[langCtx][field.key + '_' + item]}
										/>
									{/each}
								</CheckboxGroup>
							{:else if field.type == 'number'}
								<Range
									bind:value={filters[field.key].value[0]}
									label="From"
									min={field.min ?? 0}
									max={field.max ?? 0}
								>
									<div slot="label" class="flex items-center justify-between">
										<span>From</span>
										<span>({filters[field.key].value[0] ?? 0})</span>
									</div>
								</Range>
								<Range
									bind:value={filters[field.key].value[1]}
									label="To"
									min={field.min ?? 0}
									max={field.max ?? 100}
								>
									<div slot="label" class="flex items-center justify-between">
										<span>To</span>
										<span>({filters[field.key].value[1] ?? 0})</span>
									</div>
								</Range>
							{:else if field.type == 'date'}
								<DatePicker range bind:value={filters[field.key].value} />
							{:else if !field.type}
								<TextField class="w-full" bind:value={filters[field.key].value} label="Content" />
							{/if}
						{/if}
					</div>
				</Dropdown>
			{/each}

			<button
				onclick={onMoreButtonClicked}
				class="flex cursor-pointer items-center rounded-full border border-base-300 bg-base-200 px-4 py-1 hover:bg-base-300"
				class:bg-blue-200={moreFilters.length}
				class:border-blue-500={moreFilters.length}
			>
				<Icon size="lg" name="PlusMinor" />
				More Filters...
				{#if moreFilters.length}
					<Badge class="ms-2" color="primary">{moreFilters.length}</Badge>
				{/if}
			</button>
		</div>
		<div class="flex items-center gap-2 self-start">
			{#if headerActions}
				{@render headerActions()}
			{/if}
			<Button
				color={JSON.stringify(allColumns) != JSON.stringify(visibleColumns) ? 'primary' : undefined}
				onclick={onColumnsClick}
				size="sm"
				variant={JSON.stringify(allColumns) != JSON.stringify(visibleColumns)
					? undefined
					: 'outline'}
			>
				<Icon name="Columns3Major" />
			</Button>
		</div>
	</div>

	{#if loading}
		<div class="flex items-center justify-center p-12">
			<Loading color="primary" size="lg" />
		</div>
	{:else}
		<Table>
			<thead>
				<tr>
					{#each visibleColumns as columnKey}
						{@const field = fields.find((x) => x.key === columnKey)}
						<th>{lang[langCtx][field.key]}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each items as item}
					<tr>
						{#each visibleColumns as columnKey}
							{@const field = fields.find((x) => x.key === columnKey)}

							{@const props = field.props
								? field.props(item, lang[langCtx])
								: { value: item[field.key] }}

							<TableColumn name={lang[langCtx][field.key]}>
								{#if field.component}
									<svelte:component this={field.component} {...props} />
								{:else}
									<Text {...props} />
								{/if}
							</TableColumn>
						{/each}
						<TableColumn name="">Actions</TableColumn>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/if}

	<div class="flex items-center justify-between p-4">
		<div>Showing 2 of 100</div>
		<div>
			<Pagination size="sm" page={3} lastPage={10} />
		</div>
	</div>
</Card>

<Dialog bind:open={columnsModalOpen}>
	<DialogHeader title="Edit Columns"></DialogHeader>
	<DialogBody>
		<div>
			<CheckboxGroup inline column bind:value={visibleColumnsDraft}>
				{#each fields as field}
					<Checkbox checked={visibleColumnsDraft.includes(field.key)} value={field.key}>
						<div slot="label" class="flex items-center gap-2">
							{lang[langCtx][field.key]}
							{#if visibleColumnsDraft.includes(field.key)}
								<Badge color="primary">{visibleColumnsDraft.indexOf(field.key) + 1}</Badge>
							{/if}
						</div>
					</Checkbox>
				{/each}
			</CheckboxGroup>
		</div>
	</DialogBody>
	<DialogFooter>
		<Button onclick={onSaveColumns} size="sm" color="primary">Save</Button>
	</DialogFooter>
</Dialog>
