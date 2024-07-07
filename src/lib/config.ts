export const userForm = {
    fields: {
        username: {
            label: 'Username',
            type: 'string',
            required: true,
            sortable: true,
            min: 4,
            max: 12,
            pattern: patterns.username,
            cols: [12, 6],
            visibility: {
                add: true,
                edit: 'disabled'
            }
        },
        name: {
            label: 'Name',
            type: 'string',
            sortable: true,
            required: true,
            min: 6,
            max: 20,
            cols: [12, 6] // sm, md, lg, xl
        },
        email: {
            label: 'Email',
            sortable: true,
            type: 'string',
            cols: [12, 6],
            pattern: patterns.email
        },
        status: {
            label: 'Status',
            type: 'select',
            required: true,
            items: [
                {text: 'Active', value: 'active'},
                {text: 'Disabled', value: 'disabled'},
            ],
            cols: [12, 6]
        },
        date_of_birth: {
            label: 'Date of birth',
            type: 'date',
            required: false,
            cols: [12, 6]
        },
        bio: {
            label: 'Bio',
            type: 'string',
            sortable: false,
            required: false,
            input: 'textarea',
            cols: [12],
        },
    }
}

export const userDetail = {
    fields: {
        username: {
            label: 'Username',
            type: 'string',
            cols: [12, 6],
        },
        name: {
            label: 'Name',
            type: 'string',
            cols: [12, 6] // sm, md, lg, xl
        },
        email: {
            label: 'Email',
            type: 'string',
            cols: [12, 6] // sm, md, lg, xl
        },
        status: {
            label: 'Status',
            type: 'custom',
            component: Badge,
            props(item) {
                return  {
                    color: item.status === 'active' ? 'success' : 'error',
                    children: item.status === 'active' ? 'Active' : 'Disabled'
                }
            },
            cols: [12, 6]
        },
        date_of_birth: { 
            label: 'Age', 
            type: 'number',
            props(item) {
                // Get difference between item.date_of_birth.getYear() and new Date().getYear()
                return {
                    value: 30 // calculated value
                }
            },
            cols: [12, 6]
        },
        bio: {
            label: 'Bio',
            type: 'string',
            cols: [12],
        },
    }
}

export const adminSidebar = {
    items: [
        { title: 'Item one', href: '/item-one' },
        { title: 'Item two', href: '/item-two' },
        { title: 'Item three', href: '/item-three' },
        { 
            title: 'Nested', 
            items: [
                { title: 'Nested one', href: '/nested/item-one' },
                { title: 'Nested tow', href: '/nested/item-tow' },
                { title: 'Nested three', href: '/nested/item-three' },
            ] 
        },
        { 
            title: 'User Management',
            items: [
                { title: 'Users', href: '/users' },
                { title: 'Roles', href: '/roles' },
            ] 
        },
    ]
}