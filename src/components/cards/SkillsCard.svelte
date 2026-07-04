<script lang="ts">
	import { skills } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">Skills</div>
	{#each skills as group, i}
		<div class="group" class:last={i === skills.length - 1}>
			<div class="group-label">{group.label}</div>
			<div class="tags">
				{#each group.items as item}
					<span class="tag">{item}</span>
				{/each}
			</div>
		</div>
	{/each}
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

	.group {
		padding: 0.85rem 1.25rem;
		border-bottom: 1px solid var(--bg2);
	}

	.group.last {
		border-bottom: none;
	}

	.group-label {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--grey0);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.5rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
		font-size: 0.75rem;
		background: var(--bg2);
		color: var(--aqua);
		border: 1px solid var(--bg3);
	}
</style>
