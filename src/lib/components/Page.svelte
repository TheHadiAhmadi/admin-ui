<script lang="ts">
    import {Page, PageHeader, Button, Icon} from 'plantir-uikit'
	import type { Snippet } from 'svelte';

    interface PageProps {
        config: {
            title: string;
            actions?: any[]; // Adjust the type according to your needs
            container?: boolean;
        },
        children?: Snippet
            
    }

    const { config, children } = $props() as PageProps
</script>

<Page class="!p-0 h-screen" container={config.container}>
    {#if config.title || config.actions}
        <PageHeader title={config.title}>
            {#each config.actions ?? [] as action}
                <Button color={action.color} href={action.href}>
                    {#if action.icon}
                        <Icon size="lg" name={action.icon} />
                    {/if}
                    {action.label}
                </Button>
            {/each}
        </PageHeader>
    {/if}

    {#if children}
        {@render children()}
    {/if}
</Page>