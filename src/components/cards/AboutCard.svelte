<script lang="ts">
	import { person } from '$lib/data';
</script>

<div class="card">
	<div class="card-header">
		<span class="icon">●</span>
		<div>
			<div class="name">{person.name}</div>
			<div class="role">{person.role}</div>
		</div>
	</div>
	<div class="divider"></div>
	<div class="card-body">
		<p>Open to freelance and full-time roles. Reach out via the contact section.</p>
	</div>
</div>

<style>
	.card {
		background: var(--bg0);
		border: 1px solid var(--bg3);
		border-radius: 10px;
		overflow: hidden;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 1rem 1.25rem;
		background: var(--bg1);
	}

	.icon {
		font-size: 1.5rem;
		color: var(--green);
		line-height: 1;
	}

	.name {
		font-size: 1rem;
		font-weight: 700;
		color: var(--fg);
	}

	.role {
		font-size: 0.78rem;
		color: var(--grey1);
		margin-top: 0.1rem;
	}

	.divider {
		height: 1px;
		background: var(--bg3);
	}

	.card-body {
		padding: 1rem 1.25rem;
		color: var(--grey2);
		font-size: 0.85rem;
		line-height: 1.6;
	}
</style>
