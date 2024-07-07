const patterns = {
    email: /email/g,
    slug: /slug/g,
    username: /username/g,
    // ...
}
const Badge = () => 'Badge'

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

const form = {
    string(key: string, {
        required = false,
        cols = [12]
    }: any = {}) {
        return {
            key,
            type: 'string',
            required,
            cols
        }
    },
    number(key: string, {
        required = false,
        cols = [12]
    }: any = {}) {
        return {
            key,
            type: 'number',
            required,
            cols
        }
    },
    select(key: string, {
        required = false,
        items = [],
        cols = [12]
    }: any = {}) {
        return {
            type: 'select',
            key,
            required,
            items,
            cols
        }
    },
    date(key: string, {
        required = false,
        cols = [12],
    }: any = {}) {
        return {
            key,
            type: 'date',
            required,
            cols
        }
    }
}

const table: any = {
    field(key: string, { type = 'string', filterMode = 'like', sort, items, min, max, component, props}: any = {}) {
        sort ??= ['string', 'date', 'select', 'number'].some(x => x === type)

        const value = {
            key,
            filter: {
                type,
                mode: filterMode,
                items,
                min,
                max,
            },
            sort,
            props,
            component
        }
        return value
    },
}

const locales = {
    en:{
        users: {
            username: 'Username',
            username_placeholder: 'Enter your username',
            name: 'Name',
            name_placeholder: 'Enter your full name',
            email: 'Email',
            email_placeholder: 'Enter your email address',
            status: 'Status',
            status_placeholder: 'Choose status',
            status_active: 'Active',
            status_disabled: 'Disabled',
            date_of_birth: 'Date of Birth',
            date_of_birth_placeholder: 'Choose your birth date',
            bio: 'Bio',
            bio_placeholder: 'Write something about yourself',

            // table specific
            age: 'Age',
            created_at: 'Created At',

        }
    }
}

export const userSimpleForm = {
    key: 'users',
    locales,
    fields: [
        form.string('username', { required: true }),
        form.string('name'),
        form.string('email', { pattern: patterns.email }),
        form.select('status', {
            items: ['active', 'disabled'], 
            cols: [12, 6]
        }),
        form.date('date_of_birth', {
            cols: [12, 6]
        }),
        form.string('bio', {
            input: 'textarea',
        })
    ],
}

export const userSimpleForm2 = {
    key: 'users',
    locales,
    fields: [
        {
            type: 'string',
            key: 'username',
            required: true
        },
        {
            type: 'string', 
            key: 'name',
        },
        {
            type: 'string', 
            key: 'email', 
            pattern: patterns.email 
        },
        {
            type: 'select',
            key:'status',
            items: ['active', 'disabled'], 
            cols: [12, 6]
        },
        {
            type: 'date',
            key: 'date_of_birth',
            cols: [12, 6]
        },
        {
            type: 'string', 
            key: 'bio',
            input: 'textarea',
        }
    ],
}

export const userTable = {
    key: 'users',
    locales,
    fields: [
        table.field('name'),
        table.field('username', {
            props(item: any) {
                return {
                    value: '@' + item.username
                }
            }
        }),
        table.field('age', {
            type: 'number',
            min: 0,
            max: 100,
            props(item: any) {
                return {
                    value: 30
                }
            }
        }),
        table.field('status', {
            type: 'select',
            items: ['active', 'disabled'],
            component: Badge,
            props(item: any) {
                return  {
                    color: item.status === 'active' ? 'success' : 'error',
                    // children: item.status === 'active' ? 'Active' : 'Disabled'
                    children: item.status
                }
            }
        }),
        table.field('created_at', {
            type: 'date',
            // sort: true | false
        })
    ],
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