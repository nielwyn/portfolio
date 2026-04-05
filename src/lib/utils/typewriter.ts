export function typewriter(
	node: HTMLElement,
	params: { speed?: number; onDone?: () => void } = {}
) {
	const full = node.textContent ?? '';
	node.textContent = '';
	let i = 0;
	let cancelled = false;
	const speed = params.speed ?? 10;

	function tick() {
		if (cancelled) return;
		if (i < full.length) {
			node.textContent = full.slice(0, ++i);
			setTimeout(tick, speed);
		} else {
			params.onDone?.();
		}
	}

	tick();

	return {
		destroy() {
			cancelled = true;
			node.textContent = full;
		}
	};
}
