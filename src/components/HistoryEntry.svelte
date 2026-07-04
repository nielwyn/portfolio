<script lang="ts">
	import OutputBlock from './OutputBlock.svelte';
	import type { HistoryEntry } from '$lib/stores/terminal';

	let { entry }: { entry: HistoryEntry } = $props();
</script>

<div class="entry">
	{#if entry.input}
		<div class="echo">
			<span class="p-user">nielwyn</span><span class="p-sep">@</span><span
				class="p-host">portfolio</span
			><span class="p-sep"> </span><span class="p-path">~</span><span class="p-dollar"
				> $&nbsp;</span
			><span class="cmd">{entry.input}</span>
		</div>
	{/if}
	<div class="output" class:no-prompt={!entry.input}>
		{#each entry.blocks as block}
			<OutputBlock {block} />
		{/each}
	</div>
</div>

<style>
	.entry {
		margin-bottom: 0.6em;
	}

	.echo {
		display: flex;
		align-items: center;
		line-height: 1;
		opacity: 0.7;
	}

	.p-user   { color: var(--green);  }
	.p-sep    { color: var(--grey0);  }
	.p-host   { color: var(--aqua);   }
	.p-path   { color: var(--yellow); }
	.p-dollar { color: var(--grey1);  }

	.cmd {
		color: var(--grey2);
	}

	.output {
		margin-top: 0.1em;
	}

	.no-prompt {
		margin-top: 0;
	}
</style>
