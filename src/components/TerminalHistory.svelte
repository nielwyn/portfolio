<script lang="ts">
	import { terminal } from '$lib/stores/terminal';
	import HistoryEntry from './HistoryEntry.svelte';
	import { afterUpdate } from 'svelte';

	let scrollEl: HTMLDivElement;

	afterUpdate(() => {
		if (scrollEl) {
			scrollEl.scrollTop = scrollEl.scrollHeight;
		}
	});
</script>

<div class="history" bind:this={scrollEl}>
	{#each $terminal.history as entry, i}
		<HistoryEntry {entry} isLatest={i === $terminal.history.length - 1} />
	{/each}
</div>

<style>
	.history {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: 0.4em;
		scrollbar-width: thin;
		scrollbar-color: var(--color-dim) transparent;
	}

	.history::-webkit-scrollbar {
		width: 4px;
	}

	.history::-webkit-scrollbar-thumb {
		background: var(--color-dim);
		border-radius: 2px;
	}
</style>
