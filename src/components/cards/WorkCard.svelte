<script lang="ts">
	import { workHistory } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">Work History</div>

	{#each workHistory as job, i}
		<div class="job" class:last={i === workHistory.length - 1}>
			<div class="job-header">
				<span class="badge" class:current={job.to === null}>
					{job.to === null ? 'Current' : job.role}
				</span>
				<span class="dates">{job.from}{job.to ? ` → ${job.to}` : ' → present'}</span>
			</div>

			<div class="place">{job.role} @ {job.place}</div>

			<ul class="items">
				{#each job.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.card {
		background: var(--bg0);
		border: 1px solid var(--bg3);
		border-radius: 10px;
		overflow: hidden;
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
		justify-content: space-between;
		margin-bottom: 0.4rem;
		gap: 0.5rem;
		flex-wrap: wrap;
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

	.items {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.items li {
		font-size: 0.8rem;
		color: var(--grey2);
		padding-left: 0.9rem;
		position: relative;
	}

	.items li::before {
		content: '›';
		position: absolute;
		left: 0;
		color: var(--aqua);
	}
</style>
