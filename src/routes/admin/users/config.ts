import Badge from '$lib/components/table/Badge.svelte'

const patterns = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    slug: /^[a-zA-Z0-9-_]+$/g,
    username: /^[a-zA-Z0-9_]{4,}$/g,
    // Add more patterns as needed
};

const lang = {
    en: {
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

        age: 'Age',
        created_at: 'Created At',
    },
    fa: {
        username: 'نام کاربری',
        username_placeholder: 'نام کاربری خود را وارد کنید',
        name: 'نام',
        name_placeholder: 'نام کامل خود را وارد کنید',
        email: 'ایمیل',
        email_placeholder: 'آدرس ایمیل خود را وارد کنید',
        status: 'وضعیت',
        status_placeholder: 'وضعیت را انتخاب کنید',
        status_active: 'فعال',
        status_disabled: 'غیرفعال',
        date_of_birth: 'تاریخ تولد',
        date_of_birth_placeholder: 'تاریخ تولد خود را انتخاب کنید',
        bio: 'بیوگرافی',
        bio_placeholder: 'درباره خودتان بنویسید',
        button_submit: 'ثبت',
        button_cancel: 'انصراف',

        age: 'سن',
        created_at: 'تاریج ایجاد',
    },
}

export const form = {
    lang,
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

export const table = {
    name: 'users',
    lang,
    fields: [
        {key: 'name', sortable: true},
        {
            key: 'username',
            sortable: true,
            value(item: any) {
                return '@' + item.username
            },
            props(item: any) {
                return {
                    value: this.value(item)
                }
            }
        },
        { 
            key: 'age', 
            type: 'number',
            sortable: true,
            min: 0,
            max: 100,
            value(item) {
                const birthYear = new Date(item.date_of_birth).getFullYear()
                return new Date().getFullYear() - birthYear
                // value date 
                // filter.min
                // filter.max

            },
            props(item: any) {
                return {
                    value: this.value(item)
                }
            }
        },
        {
            key: 'status',
            type: 'select',
            sortable: true,
            items: ['active', 'disabled'],
            component: Badge,
            props(item: any, lang: any) {
                return  {
                    color: item.status === 'active' ? 'success' : 'error',
                    // children: item.status === 'active' ? 'Active' : 'Disabled'
                    value: lang['status_' + item.status]
                }
            }
        },
        {
            key: 'created_at',
            type: 'date',
            sortable: true,
            // sort: true | false
        }
    ],
}
