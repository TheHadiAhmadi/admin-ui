export default {
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