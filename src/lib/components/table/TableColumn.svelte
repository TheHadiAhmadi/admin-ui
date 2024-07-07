<script>
    import {getContext} from 'svelte'
    let {name, children} = $props()
    
    const head = getContext('DATA_TABLE_HEAD')
</script>

{#if head}
    <th>
        {name}
    </th>
{:else}
<td>
    {@render children()}
</td>
{/if}