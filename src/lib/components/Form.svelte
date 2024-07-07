<script lang="ts">
    import {Button, Card, CardBody, CardActions} from 'plantir-uikit'
    import Field from './Field.svelte'
    import {getContext} from 'svelte'

    let {fields, lang, value = $bindable({}), ...restProps } = $props() as any

    const langCtx = getContext('lang')


    function onSubmit(e) {
        e.preventDefault()

        console.log(value)
    }

</script>

<form class="{restProps.class}" onsubmit={onSubmit}>
    <Card>
        <CardBody>
            {#each fields as field}
                <Field field={field} bind:value={value[field.key]} lang={lang[langCtx]} />
            {/each}

            <div class="h-4"></div>
            <CardActions>
                <slot name="actions">
                    <Button>{lang[langCtx].button_cancel ?? 'Cancel'}</Button>
                    <Button type="submit" color="primary">{lang[langCtx].button_submit ?? 'Submit'}</Button>
                </slot>
            </CardActions>
        </CardBody>
    </Card>
</form>
