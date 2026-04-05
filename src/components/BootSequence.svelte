<script lang="ts">
	import { onMount } from 'svelte';
	import { bootComplete } from '$lib/stores/boot';
	import { fade } from 'svelte/transition';

	const lines = [
		{ text: 'Arch Linux 6.9.1-arch1-1 (tty1)', color: 'fg' },
		{ text: '', color: 'fg' },
		{ text: 'nielwyn login: nielwyn', color: 'orange' },
		{ text: 'Password:', color: 'fg4' },
		{ text: '', color: 'fg' },
		{ text: '[    0.000] Kernel modules loaded            [  OK  ]', color: 'green' },
		{ text: '[    0.012] Mounting filesystems             [  OK  ]', color: 'green' },
		{ text: '[    0.031] Starting network manager        [  OK  ]', color: 'green' },
		{ text: '[    0.048] Launching portfolio service     [  OK  ]', color: 'green' },
		{ text: '', color: 'fg' },
		{ text: 'Welcome back, Nielwyn.', color: 'yellow' }
	];

	let displayed: typeof lines = $state([]);
	let visible = $state(true);

	onMount(() => {
		if (sessionStorage.getItem('booted') === '1') {
			bootComplete.set(true);
			return;
		}

		let i = 0;
		function next() {
			if (i < lines.length) {
				displayed.push(lines[i++]);
				setTimeout(next, i === lines.length ? 700 : 110);
			} else {
				visible = false;
				setTimeout(() => {
					sessionStorage.setItem('booted', '1');
					bootComplete.set(true);
				}, 400);
			}
		}
		setTimeout(next, 200);
	});
</script>

{#if visible}
	<div class="page" transition:fade={{ duration: 300 }}>
		<div class="window">
			<div class="window-bar">
				<span class="bar-user">nielwyn</span><span class="bar-sep">@</span><span class="bar-host">portfolio</span>
			</div>
			<div class="body">
				{#each displayed as line}
					<div class="line {line.color}">{line.text}</div>
				{/each}
				<span class="cursor-blink">▋</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: var(--color-page-bg);
		padding: 2.5rem;
	}

	.window {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 900px;
		height: 88vh;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		box-shadow: none;
		overflow: hidden;
	}

	.window-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.45rem 1rem;
		background: var(--bg1);
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
		font-size: var(--font-size-sm);
		font-weight: 700;
	}

	.bar-user  { color: var(--green); }
	.bar-sep   { color: var(--grey0); }
	.bar-host  { color: var(--aqua); }

	.body {
		flex: 1;
		padding: 1.2rem 1.5rem;
		overflow: hidden;
	}

	.line {
		line-height: 1.8;
		white-space: pre;
	}

	/* color classes matching CSS vars */
	.fg     { color: var(--fg); }
	.fg4    { color: var(--fg4); }
	.green  { color: var(--green); }
	.yellow { color: var(--yellow); }
	.orange { color: var(--orange); }

	.cursor-blink {
		color: var(--orange);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}

	@media (max-width: 700px) {
		.page { padding: 0; }
		.window {
			max-width: 100%;
			height: 100vh;
			border-radius: 0;
			border: none;
		}
		.body { padding: 0.75rem; }
	}
</style>
