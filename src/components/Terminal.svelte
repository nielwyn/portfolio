<script lang="ts">
	import { onMount } from 'svelte';
	import AmbientBackground from './AmbientBackground.svelte';
	import TerminalHistory from './TerminalHistory.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import { terminal } from '$lib/stores/terminal';

	const NAV_COMMANDS = ['about', 'work', 'skills', 'projects', 'contact', 'help'];

	let inputRef: TerminalInput;

	function focusInput() {
		inputRef?.focus();
	}

	function handlePageClick() {
		// A click that ends a text selection is a copy gesture, not a focus
		// request — focusing the input here would collapse the selection.
		const sel = window.getSelection();
		if (sel && !sel.isCollapsed) return;
		focusInput();
	}

	function runCommand(name: string) {
		terminal.submitCommand(name);
		focusInput();
	}

	// Real terminals accept keystrokes without clicking the prompt first:
	// route stray typing to the input, but leave browser shortcuts (Ctrl+C
	// copy...) and keyboard navigation of buttons/links alone.
	function routeKeys(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		const target = e.target as HTMLElement | null;
		if (target && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName)) return;
		const routable =
			e.key.length === 1 || ['Backspace', 'Enter', 'ArrowUp', 'ArrowDown'].includes(e.key);
		if (!routable) return;
		focusInput();
	}

	onMount(() => {
		terminal.submitCommand('neofetch');
		terminal.inject([
			{ type: 'text', content: `Last login: ${new Date().toDateString()}  on tty1` },
			{ type: 'text', content: '' }
		]);
		terminal.submitCommand('about');
		terminal.inject([
			{ type: 'text', content: "  Click a section above, or type 'help' for commands." },
			{ type: 'text', content: '' }
		]);

		window.addEventListener('keydown', routeKeys);
		return () => window.removeEventListener('keydown', routeKeys);
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="page" onclick={handlePageClick}>
	<AmbientBackground />
	<div class="window">
		<div class="window-bar">
			<span class="bar-title">
				<span class="bar-user">nielwyn</span><span class="bar-sep">@</span><span class="bar-host">portfolio</span>
			</span>
		</div>

		<nav class="quicknav">
			{#each NAV_COMMANDS as cmd}
				<button type="button" onclick={() => runCommand(cmd)}>{cmd}</button>
			{/each}
		</nav>

		<div class="body">
			<TerminalHistory>
				<TerminalInput bind:this={inputRef} />
			</TerminalHistory>
		</div>
	</div>
</div>

<style>
	.page {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--bg-dim);
		padding: 2rem;
	}

	.window {
		position: relative;
		z-index: 1;
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

	.quicknav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.65rem 1.5rem;
		background: var(--bg1);
		border-bottom: 1px solid var(--bg3);
		flex-shrink: 0;
	}

	.quicknav button {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		padding: 0.3rem 0.8rem;
		border-radius: 999px;
		border: 1px solid var(--bg3);
		background: var(--bg2);
		color: var(--aqua);
		cursor: pointer;
		transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
	}

	.quicknav button::before {
		content: '$ ';
		color: var(--grey0);
	}

	.quicknav button:hover {
		border-color: var(--aqua);
		color: var(--fg);
		background: var(--bg3);
	}

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
		.quicknav { padding: 0.6rem 0.75rem; }
		.body { padding: 0.75rem; }
	}
</style>
