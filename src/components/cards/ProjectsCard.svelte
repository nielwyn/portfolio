<script lang="ts">
	import { projects } from '$lib/data';
</script>

<div class="card">
	<div class="card-title">Projects</div>

	{#each projects as project, i}
		<div class="project" class:last={i === projects.length - 1}>
			<div class="project-header">
				<span class="name">{project.name}</span>
				<a href={project.href} target="_blank" rel="noopener noreferrer" class="link">View →</a>
			</div>
			<p class="blurb">{project.blurb}</p>
			<div class="tags">
				{#each project.stack as tech}
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

	.project {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--bg2);
	}

	.project.last {
		border-bottom: none;
	}

	.project-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.4rem;
	}

	.name {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--fg);
	}

	.link {
		font-size: 0.78rem;
		color: var(--blue);
		flex-shrink: 0;
	}

	.link:hover {
		color: var(--aqua);
		text-decoration: underline;
	}

	.blurb {
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
