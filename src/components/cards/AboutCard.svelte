<script lang="ts">
	import { person, about } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">About</div>
	<div class="body">
		{#each about.paragraphs as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>
	<div class="footer">{person.status}</div>
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

	.body {
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		color: var(--grey2);
		font-size: 0.85rem;
		line-height: 1.6;
	}

	.footer {
		padding: 0.75rem 1.25rem;
		font-size: 0.78rem;
		color: var(--green);
		background: var(--bg1);
		border-top: 1px solid var(--bg3);
	}
</style>
