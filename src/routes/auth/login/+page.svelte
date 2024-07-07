<script>
    import {Button} from 'plantir-uikit'
    import Form from '$lib/components/Form.svelte'
    import Page from '$lib/components/Page.svelte'

    const fields = [
        {
            key: 'username',
            required: true,
        },
        {
            key: 'password',
            required: true,
        },
    ]

    const lang = {
        en: {
            username: 'Username',
            username_placeholder: 'Enter your username',
            password: 'Password',
            password_placeholder: 'Enter your password',
          
        }
    }
</script>

<Page config={{container: false}}>
    <div class="flex h-full w-full">
        <div class="hidden flex-1 md:flex bg-blue-500">
            Left section
        </div>
        <div class="w-full h-full flex md:w-1/2 flex-col items-center justify-center p-12">
            <div class="w-full max-w-xl">

                <h3 class="text-3xl mb-4">Login</h3>
                <Form {fields} {lang}>
                    <svelte:fragment slot="actions">
                        <Button color="primary" block>Sign up</Button>
                        <span>Don't Have account? <Button class="!p-0 !min-h-6 !h-6" variant="link" href="/auth/register">Register</Button></span>
                    </svelte:fragment>
                </Form>
            </div>
        </div>   
    </div>

</Page>