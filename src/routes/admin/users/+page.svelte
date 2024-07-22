<script lang="ts">
    import {getContext, onMount} from 'svelte'
    import DataTable from '$lib/components/table/DataTable.svelte'
    import TableColumn from '$lib/components/table/TableColumn.svelte'
    import Text from '$lib/components/table/Text.svelte'
    import Page from '$lib/components/Page.svelte'
    
    import {table} from './config'

    const pageConfig = {
        title: 'Users list',
        breadcrumbs: [
            {title: 'Home', link: '/'},
            {title: 'Users'},
        ],
        actions: [
            {label: 'Add new user', icon: 'PlusMinor', color: 'primary', href: "/admin/users/add"}
        ]
    }

    let items = []
    let perPage = 10
    let totalItems = 0
    let page = 1

    async function loadTableData({page, perPage, sort, filters, fields}) {
        // var items = await fetch(`/api/users?page=${page}&perPage=${perPage}`).then(res => res.json())
        
        var res = items.filter(item => {
            for(let key in filters) {

                const field = fields.find(x => x.key === key)
                const value = field.value ? field.value(item) : item[key]
                const filter = filters[key].value
                
                field.type ??= 'text'

                if(field.type === 'text') {
                    if(filter) {
                        if(value.indexOf(filter) == -1)
                            return false;
                    }
                }
                if(field.type === 'number') {
                    if(filter?.length) {
                        if(value < +filter[0] || value > +filter[1])
                            return false;
                    }
                }
                if(field.type === 'select') {
                    if(filter?.length) {
                        if(!filter.includes(value))
                            return false;
                    }
                }
            }
            return true
        })

        let totalItems = res.length

        if(sort?.column) {
            
            res = res.sort((a, b) => {
                let multiplier = sort.order === 'ASC' ? 1 : -1
                let field = fields.find(x => x.key === sort.column)
                let valueA = field.value ? field.value(a) : a[sort.column]
                let valueB = field.value ? field.value(b) : b[sort.column]
                return valueA > valueB ? multiplier : -multiplier
            })
        }

        if(page && perPage) {
            res = res.slice(perPage * (page - 1), perPage * page)
        }
        console.log(res, filters)
        return {
            page,
            perPage,
            totalItems,
            items: res
        }
    }

    onMount(async () => {
        var result = await fetch(`/api/users`).then(res => res.json())
        totalItems = result.length

        items = result.slice(40, 50)
        perPage = 10
        page = 4
        
    })
</script>

<Page config={pageConfig}>
    <DataTable {perPage} {totalItems} {page} {items} name={table.name} fields={table.fields} lang={table.lang} />
</Page>
