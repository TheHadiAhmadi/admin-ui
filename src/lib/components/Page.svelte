<script lang="ts">
    import {Page, PageHeader, Button} from 'plantir-uikit'
	import type { Snippet } from 'svelte';

    interface PageProps {
        title: string;
        actions?: any[]; // Adjust the type according to your needs
        children?: Snippet
    }

    const { title, actions, children } = $props() as PageProps
</script>

<Page>
    <PageHeader title={title}>
        {#each actions ?? [] as action}
            <Button color={action.color}>{action.label}</Button>
        {/each}
    </PageHeader>

    {#if children}
        {@render children()}
    {/if}
</Page>