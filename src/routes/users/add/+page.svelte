<script lang="ts">
    import {userForm} from '$lib/config'
    import Page from '$lib/components/Page.svelte'
	import Form from '$lib/components/Form.svelte';

    const pageConfig = {
        title: 'Add User',
        breadcrumbs: [
            {title: 'Home', link: '/'},
            {title: 'Users', link: '/users'},
            {title: 'Add'},
        ],
        actions: [
            {label: 'Back', color: 'primary'}
        ]
    }

</script>

<Page config={pageConfig}>
    <Form fields={userForm.fields} />
</Page>

