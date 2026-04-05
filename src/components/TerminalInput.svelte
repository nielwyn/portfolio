<script lang="ts">
	import Cursor from './Cursor.svelte';
	import { terminal } from '$lib/stores/terminal';

	let inputEl: HTMLInputElement;
	let value = $state('');
	let draft = $state('');

	export function focus() {
		inputEl?.focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			terminal.submitCommand(value);
			draft = '';
			value = '';
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			value = terminal.historyUp(draft);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			value = terminal.historyDown(draft);
			draft = value;
		}
	}

	function handleInput() {
		draft = value;
	}
</script>

<div class="input-line">
	<span class="p-user">nielwyn</span><span class="p-sep">@</span><span
		class="p-host">portfolio</span
	><span class="p-sep"> </span><span class="p-path">~</span><span class="p-dollar"> $&nbsp;</span><span
		class="mirror">{value}</span
	><Cursor />
	<!-- svelte-ignore a11y_autofocus -->
	<input
		bind:this={inputEl}
		bind:value
		onkeydown={handleKeydown}
		oninput={handleInput}
		type="text"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck={false}
		aria-label="terminal input"
		autofocus
	/>
</div>

<style>
	.input-line {
		display: flex;
		align-items: center;
		position: relative;
		flex-shrink: 0;
		padding-top: 0.3em;
		line-height: 1;
	}

	.p-user   { color: var(--green);  }
	.p-sep    { color: var(--grey0);  }
	.p-host   { color: var(--aqua);   }
	.p-path   { color: var(--yellow); }
	.p-dollar { color: var(--grey1);  }

	.mirror {
		color: var(--fg);
		white-space: pre;
	}

	input {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		font-size: 16px;
		border: none;
		background: transparent;
		cursor: default;
		color: transparent;
		caret-color: transparent;
	}
</style>
