<span class="cursor"></span>

<style>
	.cursor {
		display: inline-block;
		width: 0.55ch;
		height: 1em;
		background: var(--color-cursor);
		animation: blink 1s step-end infinite;
		flex-shrink: 0;
		align-self: center;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}
</style>
