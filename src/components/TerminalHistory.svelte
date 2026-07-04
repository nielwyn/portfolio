<script lang="ts">
	import type { Snippet } from 'svelte';
	import { terminal } from '$lib/stores/terminal';
	import HistoryEntry from './HistoryEntry.svelte';

	let { children }: { children?: Snippet } = $props();

	let scrollEl: HTMLDivElement;

	$effect(() => {
		$terminal.history; // track — re-run whenever history changes
		if (scrollEl) {
			scrollEl.scrollTop = scrollEl.scrollHeight;
		}
	});
</script>

<div class="history" bind:this={scrollEl}>
	{#each $terminal.history as entry, i}
		<HistoryEntry {entry} isLatest={i === $terminal.history.length - 1} />
	{/each}
	{@render children?.()}
</div>

<style>
	.history {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: 0.4em;
		scrollbar-width: none;
	}

	.history::-webkit-scrollbar {
		display: none;
	}
</style>
