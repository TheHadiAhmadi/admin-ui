<script>
    import {Badge} from 'plantir-uikit'

    let {value, color} = $props()
</script>

<Badge {color}>
    {value}
</Badge>