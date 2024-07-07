<script>
    import {getContext} from 'svelte'
    import Text from './Text.svelte'
    import TableColumn from './TableColumn.svelte'
    import {Table, Card} from 'plantir-uikit'
    let { items, fields, lang } = $props()

    let langCtx = getContext('lang')

</script>

<Card>
    <Table>
        <thead>
            <tr>
                {#each fields as field}
                    <th>{lang[langCtx][field.key]}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                <tr>
                    {#each fields as field}
                        {@const props = field.props ? field.props(item, lang[langCtx]) : {value: item[field.key]}}

                        <TableColumn name={lang[langCtx][field.key]}>
                            {#if field.component}
                                <svelte:component this={field.component} {...props} />
                            {:else}
                                <Text {...props}/>
                            {/if}
                        </TableColumn>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </Table>
</Card>