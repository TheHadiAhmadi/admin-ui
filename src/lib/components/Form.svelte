<script lang="ts">
    import {Button, Card, CardBody, CardActions} from 'plantir-uikit'
    import Field from './Field.svelte'
    let {fields, value = $bindable({}) } = $props() as any

    function onSubmit(e) {
        e.preventDefault()

        console.log(value)
    }

</script>


<form onsubmit={onSubmit}>
    <Card>
        <CardBody>
            {#each Object.keys(fields) as key}
                <Field field={fields[key]} bind:value={value[key]} />
            {/each}

            <div class="h-4"></div>
            <CardActions>
                <Button>Cancel</Button>
                <Button type="submit" color="primary">Submit</Button>
            </CardActions>
        </CardBody>
    </Card>
</form>
