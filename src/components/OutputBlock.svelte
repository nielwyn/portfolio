<script lang="ts">
	import { typewriter } from '$lib/utils/typewriter';
	import type { OutputBlock } from '$lib/commands/types';
	import NeofetchBlock from './NeofetchBlock.svelte';
	import AboutCard from './cards/AboutCard.svelte';
	import WorkCard from './cards/WorkCard.svelte';
	import SkillsCard from './cards/SkillsCard.svelte';
	import ProjectsCard from './cards/ProjectsCard.svelte';
	import ContactCard from './cards/ContactCard.svelte';

	let { block, animate = true }: { block: OutputBlock; animate?: boolean } = $props();
</script>

{#if block.type === 'about-card'}
	<AboutCard />
{:else if block.type === 'work-card'}
	<WorkCard />
{:else if block.type === 'skills-card'}
	<SkillsCard />
{:else if block.type === 'projects-card'}
	<ProjectsCard />
{:else if block.type === 'contact-card'}
	<ContactCard />
{:else if block.type === 'error'}
	<div class="line error">
		{#if animate}
			<span use:typewriter={{ speed: 8 }}>✗  {block.content}</span>
		{:else}
			✗  {block.content}
		{/if}
	</div>
{:else if block.type === 'section'}
	<div class="line section">
		{#if animate}
			<span use:typewriter={{ speed: 6 }}>{block.content}</span>
		{:else}
			{block.content}
		{/if}
	</div>
{:else if block.type === 'pre'}
	<pre class="pre">{block.content}</pre>
{:else if block.type === 'neofetch' && block.neofetchData}
	<NeofetchBlock data={block.neofetchData} />
{:else if block.type === 'link'}
	<div class="line">
		<span class="link-prefix">{block.content}</span><a href={block.href} target="_blank" rel="noopener noreferrer">{block.href}</a>
	</div>
{:else}
	<div class="line">
		{#if animate && block.content}
			<span use:typewriter={{ speed: 8 }}>{block.content}</span>
		{:else}
			{block.content}
		{/if}
	</div>
{/if}

<style>
	.line {
		min-height: 1.7em;
		white-space: pre-wrap;
		word-break: break-word;
		color: var(--fg);
	}

	.error {
		color: var(--red);
	}

	.section {
		color: var(--green);
		font-weight: 700;
		margin-top: 0.4em;
		padding-bottom: 0.15em;
		border-bottom: 1px solid var(--bg3);
	}

	.pre {
		color: var(--aqua);
		white-space: pre;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: 1.4;
		margin: 0.3em 0;
	}

	.link-prefix {
		color: var(--grey1);
	}

	a {
		color: var(--blue);
	}

	a:hover {
		color: var(--aqua);
		text-decoration: underline;
	}
</style>
