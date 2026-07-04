<script lang="ts">
	import { contact, person } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">Contact</div>
	<div class="rows">
		{#each contact as item, i}
			<div class="row" class:last={i === contact.length - 1}>
				<span class="label">{item.label}</span>
				<a href={item.href} target="_blank" rel="noopener noreferrer">{item.value}</a>
			</div>
		{/each}
	</div>
	<div class="footer">
		{person.status}
	</div>
</div>

<style>
	.card {
		background: var(--bg0);
		border: 1px solid var(--bg3);
		border-radius: 10px;
		overflow: hidden;
		margin: 0.4em 0;
	}

	.card-title {
		padding: 0.9rem 1.25rem;
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--fg);
		background: var(--bg1);
		border-bottom: 1px solid var(--bg3);
	}

	.rows {
		padding: 0.25rem 0;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.7rem 1.25rem;
		border-bottom: 1px dashed var(--bg2);
		gap: 1rem;
	}

	.row.last {
		border-bottom: none;
	}

	.label {
		font-size: 0.8rem;
		color: var(--grey1);
		flex-shrink: 0;
		width: 5rem;
	}

	a {
		font-size: 0.82rem;
		color: var(--blue);
		text-align: right;
		word-break: break-all;
	}

	a:hover {
		color: var(--aqua);
		text-decoration: underline;
	}

	.footer {
		padding: 0.75rem 1.25rem;
		font-size: 0.78rem;
		color: var(--grey0);
		background: var(--bg1);
		border-top: 1px solid var(--bg3);
	}
</style>
