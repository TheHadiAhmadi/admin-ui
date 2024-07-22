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

	let { sortColumn, sortOrder, page = 1, perPage = 10, totalItems, name, items, fields, lang, loadTableData, headerActions } = $props();

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
		onFilterChanged()
	}

	function onMoreButtonClicked() {
		// moreFilters.push({})
		//
	}

	function filterHasValue(filter, field) {
		if (!filter) return;
		if (filter.type == 'number') {
			return filter.value[0] > field.min || filter.value[1] < field.max;
		} else if (field.type === 'select') {
			return filter.value?.length > 0;
		} else if (field.type === 'date') {
			return filter.value?.length > 0;
		} else {
			return filter.value;
		}
	}

	async function loadData() {
		if(loadTableData) {
			var result = await loadTableData({page, perPage, sort: {order: sortOrder, column: sortColumn }, filters, fields})
			items = result.items
			totalItems = result.totalItems
		}
	}

	function onChangeSort(key) {
		if (sortColumn !== key) {
			sortColumn = key
		} else {
			sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
		}
		loadData()
	}

	function onPageChange(event) {
		// console.log(event)
		page = event.detail

		loadData()
	}

	onMount(async () => {
		allColumns = fields.map((x) => x.key);

		if (!visibleColumns.length) {
			// get from localstorage

			let localStorageItems = localStorage.getItem('TABLE_COLUMNS_' + name);
			if (name && localStorageItems) {
				visibleColumns = JSON.parse(localStorageItems);
			} else {
				visibleColumns = allColumns;
			}
		}

		for (let field of fields) {
			filters[field.key] = {
				type: field.type ?? 'text'
			};
			if (field.type === 'number') {
				filters[field.key].value = [field.min, field.max];
			}
		}

		await loadData()
	
		loading = false;
	});

	function onFilterChanged() {
		page = 1		
		loadData()
	}
</script>

<Card>
	<div class="flex items-center justify-between p-4">
		<div class="flex flex-wrap items-center gap-2">
			{#each fields as field}
				<Dropdown placement="bottom-start">
					<div
						slot="toggler"
						class="flex cursor-pointer items-center gap-2 rounded-full hover:text-base-content border border-base-300 bg-base-200 px-4 py-1 hover:bg-base-300"
						class:bg-primary={filterHasValue(filters[field.key], field)}
						class:text-primary-content={filterHasValue(filters[field.key], field)}
						class:border-primary={filterHasValue(filters[field.key], field)}
					>   
						{lang[langCtx][field.key]}
						{#if filterHasValue(filters[field.key], field)}
							<Icon onclick={(e) => onFilterRemoveClick(e, field)} name="CancelMajor" />
						{/if}
					</div>
					<div class="w-full">
						{#if filters[field.key]}
							{#if field.type == 'select'}
								<CheckboxGroup onchange={onFilterChanged} bind:value={filters[field.key].value} inline column>
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
									onchange={onFilterChanged}
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
									onchange={onFilterChanged}
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
							{:else if field.type ?? 'text' == 'text'}
								<TextField onchange={onFilterChanged} class="w-full" bind:value={filters[field.key].value} label="Content" />
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
						<th>
							<button type="button" onclick={() => onChangeSort(field.key)} class="flex gap-2 items-center">
								<span>{lang[langCtx][field.key]}</span>
								{#if field.sortable && sortColumn == field.key}
									{#if sortOrder === 'ASC'}
										<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/><path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/></g></svg>
									{:else}
										<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/><path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/></g></svg>
									{/if}
								{:else}
									<div class="w-4 h-4"></div>
								{/if}
							</button>
							
						</th>
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
		<div>Showing {(perPage * (page - 1)) + 1}-{perPage * page} of {totalItems}</div>
		<div>
			<Pagination on:change={onPageChange} size="sm" {page} lastPage={Math.ceil(totalItems / perPage)} />
		</div>
	</div>
</Card>

<Dialog bind:open={columnsModalOpen}>
	<DialogHeader title="Edit Columns" />
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
