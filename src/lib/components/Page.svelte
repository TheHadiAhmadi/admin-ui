<script lang="ts">
    import {Page, PageHeader, Button} from 'plantir-uikit'
	import type { Snippet } from 'svelte';

    interface PageProps {
        config: {
            title: string;
            actions?: any[]; // Adjust the type according to your needs
        },
        children?: Snippet
            
    }

    const { config, children } = $props() as PageProps
</script>

<Page>
    <PageHeader title={config.title}>
        {#each config.actions ?? [] as action}
            <Button color={action.color} href={action.href}>{action.label}</Button>
        {/each}
    </PageHeader>

    {#if children}
        {@render children()}
    {/if}
</Page>