<script lang="ts">
    import {getContext} from 'svelte'
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

    const items = [
        {
            name: 'Hadi',
            date_of_birth: '2002-03-27',
            username: 'thehadiahmadi',
            status: 'active',
            created_at: new Date(),
            email: 'email@gmail.com',
        },
        {
            name: 'Hadi',
            date_of_birth: '2002-03-27',
            username: 'thehadiahmadi',
            status: 'disabled',
            created_at: new Date(),
            email: 'email@gmail.com',
        },
        {
            name: 'Hadi',
            date_of_birth: '2002-03-27',
            username: 'thehadiahmadi',
            status: 'active',
            created_at: new Date(),
            email: 'email@gmail.com',
        },
    ]

</script>

<Page config={pageConfig}>
    <DataTable name={table.name} fields={table.fields} lang={table.lang} {items} />
</Page>
