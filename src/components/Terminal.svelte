<script lang="ts">
	import { onMount, tick } from 'svelte';
	import TerminalHistory from './TerminalHistory.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import { terminal } from '$lib/stores/terminal';

	let inputRef: TerminalInput;

	function focusInput() {
		inputRef?.focus();
	}

	onMount(async () => {
		// Pre-populate the terminal with all portfolio content — appears already
		// printed, like opening an existing session.
		terminal.submitCommand('work');
		terminal.submitCommand('skills');
		terminal.submitCommand('contact');
		await tick();
		focusInput();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="page" onclick={focusInput}>
	<div class="window">
		<div class="window-bar">
			<span class="bar-title">
				<span class="bar-user">nielwyn</span><span class="bar-sep">@</span><span class="bar-host">portfolio</span>
			</span>
		</div>
		<div class="body">
			<TerminalHistory />
			<TerminalInput bind:this={inputRef} />
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--bg-dim);
		padding: 2rem;
	}

	.window {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 960px;
		height: 92vh;
		background: var(--bg0);
		border: 1px solid var(--bg3);
		border-radius: 8px;
		overflow: hidden;
		cursor: text;
		user-select: text;
	}

	.window-bar {
		display: flex;
		align-items: center;
		padding: 0.55rem 1rem;
		background: var(--bg1);
		border-bottom: 1px solid var(--bg3);
		flex-shrink: 0;
		gap: 0.75rem;
	}

	.bar-title {
		font-size: var(--font-size-sm);
		font-weight: 700;
		flex: 1;
		text-align: center;
	}

	.bar-user  { color: var(--green); }
	.bar-sep   { color: var(--grey0); }
	.bar-host  { color: var(--aqua);  }

	.body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.25rem 1.5rem 1rem;
		overflow: hidden;
		gap: 0;
	}

	@media (max-width: 700px) {
		.page {
			padding: 0;
			align-items: stretch;
		}
		.window {
			max-width: 100%;
			height: 100vh;
			border-radius: 0;
			border: none;
		}
		.body { padding: 0.75rem; }
	}
</style>
