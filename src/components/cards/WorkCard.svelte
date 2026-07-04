<script lang="ts">
	import { workHistory } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">Work History</div>

	{#each workHistory as job, i}
		<div class="job" class:last={i === workHistory.length - 1}>
			<div class="job-header">
				{#if job.to === null}
					<span class="badge current">Current</span>
				{/if}
				<span class="dates">{job.from} → {job.to ?? 'present'}</span>
			</div>

			<div class="place">{job.role} @ {job.place}</div>
			<p class="summary">{job.summary}</p>

			<div class="tags">
				{#each job.stack as tech}
					<span class="tag">{tech}</span>
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

	.job {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--bg2);
	}

	.job.last {
		border-bottom: none;
	}

	.job-header {
		display: flex;
		align-items: center;
		margin-bottom: 0.4rem;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.job-header .dates {
		margin-left: auto;
	}

	.badge {
		display: inline-block;
		padding: 0.2rem 0.65rem;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 600;
		background: var(--bg3);
		color: var(--grey2);
	}

	.badge.current {
		background: color-mix(in srgb, var(--green) 20%, var(--bg1));
		color: var(--green);
	}

	.dates {
		font-size: 0.75rem;
		color: var(--grey0);
	}

	.place {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--fg);
		margin-bottom: 0.5rem;
	}

	.summary {
		font-size: 0.8rem;
		color: var(--grey2);
		line-height: 1.55;
		margin-bottom: 0.6rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
		font-size: 0.72rem;
		background: var(--bg2);
		color: var(--aqua);
		border: 1px solid var(--bg3);
	}
</style>
