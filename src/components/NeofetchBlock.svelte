<script lang="ts">
	import type { NeofetchData } from '$lib/commands/types';

	let { data }: { data: NeofetchData } = $props();

	const swatchColors = ['--red', '--orange', '--yellow', '--green', '--aqua', '--blue', '--purple'];
</script>

<div class="neofetch">
	<!-- Left: avatar -->
	<div class="nf-avatar">
		{#if data.avatar}
			<img src={data.avatar} alt="avatar" />
		{:else}
			<div class="nf-initials">NW</div>
		{/if}
	</div>

	<!-- Right: info -->
	<div class="nf-info">
		<div class="nf-header">
			<span class="nf-user">{data.username}</span><span class="nf-sep">@</span><span class="nf-host">{data.host}</span>
		</div>
		<div class="nf-divider"></div>

		{#each data.info as row}
			{#if row === null}
				<div class="nf-empty"></div>
			{:else if 'rowType' in row && row.rowType === 'colors'}
				<div class="nf-swatches">
					{#each swatchColors as c}
						<span class="nf-swatch" style="background: var({c})"></span>
					{/each}
				</div>
			{:else if 'label' in row}
				<div class="nf-row">
					<span class="nf-label">{row.label}</span>
					<span class="nf-colon">:</span>
					<span class="nf-value">{row.value}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.neofetch {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		width: 100%;
		margin: 0.4em 0;
		font-size: var(--font-size-base);
		line-height: 1.6;
	}

	/* ── Avatar ─────────────────────────────────────── */
	.nf-avatar {
		flex-shrink: 0;
		width: 160px;
		height: 160px;
		border-radius: 4px;
		overflow: hidden;
		background: var(--bg2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nf-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(30%);
	}

	.nf-initials {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--aqua);
		letter-spacing: 0.05em;
	}

	/* ── Info panel ──────────────────────────────────── */
	.nf-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.nf-header {
		font-weight: 700;
		margin-bottom: 0.2em;
	}

	.nf-user { color: var(--green); }
	.nf-sep  { color: var(--grey0); }
	.nf-host { color: var(--aqua);  }

	.nf-divider {
		width: 100%;
		border-bottom: 1px solid var(--fg);
		margin-bottom: 0.4em;
	}

	.nf-row {
		display: flex;
		gap: 0.5ch;
	}

	.nf-label {
		color: var(--aqua);
		font-weight: 700;
		min-width: 8ch;
		flex-shrink: 0;
	}

	.nf-colon {
		color: var(--grey0);
	}

	.nf-value {
		color: var(--fg);
	}

	.nf-empty {
		height: 1.6em;
	}

	/* ── Color swatches ──────────────────────────────── */
	.nf-swatches {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.1em;
	}

	.nf-swatch {
		display: inline-block;
		width: 18px;
		height: 18px;
		border-radius: 3px;
	}
</style>
