<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;
	let wrapEl: HTMLDivElement;

	const SPACING = 28; // px between grid dots
	const DOT_R = 1;
	const DIM_RGB = '122, 132, 120'; // grey0 — faint at rest
	const DIM_ALPHA = 0.5;
	const GLOW_RGB = '131, 192, 146'; // aqua — brightens under the cursor
	const GLOW_RADIUS = 170;
	const GLOW_ALPHA = 0.9;

	onMount(() => {
		const ctx = canvasEl.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;
		let W = 0, H = 0;
		let active = true;
		let raf = 0;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// The dim grid never changes shape — render it once per resize and blit
		// it each frame instead of redrawing every dot every tick.
		const gridCanvas = document.createElement('canvas');
		const gridCtx = gridCanvas.getContext('2d')!;

		function paintGrid() {
			gridCanvas.width = W * dpr;
			gridCanvas.height = H * dpr;
			gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			gridCtx.clearRect(0, 0, W, H);
			gridCtx.fillStyle = `rgba(${DIM_RGB}, ${DIM_ALPHA})`;
			for (let x = 0; x <= W; x += SPACING) {
				for (let y = 0; y <= H; y += SPACING) {
					gridCtx.beginPath();
					gridCtx.arc(x, y, DOT_R, 0, Math.PI * 2);
					gridCtx.fill();
				}
			}
		}

		// Pre-rendered noise tile, blitted at a shifting offset each frame — a
		// touch of texture so the flat dark gutter doesn't read as sterile.
		const GRAIN_SIZE = 128;
		const grainCanvas = document.createElement('canvas');
		grainCanvas.width = GRAIN_SIZE;
		grainCanvas.height = GRAIN_SIZE;
		const grainCtx = grainCanvas.getContext('2d')!;
		(function paintGrain() {
			const img = grainCtx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
			for (let i = 0; i < img.data.length; i += 4) {
				const v = Math.random() * 255;
				img.data[i] = v;
				img.data[i + 1] = v;
				img.data[i + 2] = v;
				img.data[i + 3] = Math.random() * 40;
			}
			grainCtx.putImageData(img, 0, 0);
		})();

		function resize() {
			W = wrapEl.clientWidth;
			H = wrapEl.clientHeight;
			canvasEl.width = W * dpr;
			canvasEl.height = H * dpr;
			canvasEl.style.width = `${W}px`;
			canvasEl.style.height = `${H}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			paintGrid();
		}

		resize();
		window.addEventListener('resize', resize);

		let mouseX = -9999;
		let mouseY = -9999;
		function onMouseMove(e: MouseEvent) {
			const rect = wrapEl.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
		window.addEventListener('mousemove', onMouseMove);

		// Only the handful of grid dots near the cursor get re-lit each frame —
		// no need to touch the rest of the (static) grid.
		function drawSpotlight() {
			if (mouseX < -1000) return;
			const startCol = Math.floor((mouseX - GLOW_RADIUS) / SPACING);
			const endCol = Math.ceil((mouseX + GLOW_RADIUS) / SPACING);
			const startRow = Math.floor((mouseY - GLOW_RADIUS) / SPACING);
			const endRow = Math.ceil((mouseY + GLOW_RADIUS) / SPACING);

			for (let col = startCol; col <= endCol; col++) {
				const x = col * SPACING;
				if (x < 0 || x > W) continue;
				for (let row = startRow; row <= endRow; row++) {
					const y = row * SPACING;
					if (y < 0 || y > H) continue;
					const dist = Math.hypot(x - mouseX, y - mouseY);
					if (dist > GLOW_RADIUS) continue;
					const glow = 1 - dist / GLOW_RADIUS;
					ctx.beginPath();
					ctx.fillStyle = `rgba(${GLOW_RGB}, ${glow * GLOW_ALPHA})`;
					ctx.arc(x, y, DOT_R * (1 + glow), 0, Math.PI * 2);
					ctx.fill();
				}
			}
		}

		let grainOffsetX = 0, grainOffsetY = 0, frame = 0;

		function tick() {
			if (!active) return;
			frame++;

			// Hidden below the mobile breakpoint (display: none), so the wrap
			// element has no layout box and W/H collapse to 0 — nothing to draw.
			if (W <= 0 || H <= 0) {
				raf = requestAnimationFrame(tick);
				return;
			}

			ctx.clearRect(0, 0, W, H);
			ctx.drawImage(gridCanvas, 0, 0, W, H);

			if (!reduceMotion) {
				drawSpotlight();

				if (frame % 4 === 0) {
					grainOffsetX = Math.floor(Math.random() * GRAIN_SIZE);
					grainOffsetY = Math.floor(Math.random() * GRAIN_SIZE);
				}
				ctx.save();
				ctx.globalAlpha = 0.5;
				for (let gx = -grainOffsetX; gx < W; gx += GRAIN_SIZE) {
					for (let gy = -grainOffsetY; gy < H; gy += GRAIN_SIZE) {
						ctx.drawImage(grainCanvas, gx, gy);
					}
				}
				ctx.restore();
			}

			raf = requestAnimationFrame(tick);
		}

		if (!reduceMotion) {
			raf = requestAnimationFrame(tick);
		} else {
			tick(); // single static frame — just the dim grid, no spotlight/grain motion
		}

		return () => {
			active = false;
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', onMouseMove);
		};
	});
</script>

<div class="ambient" bind:this={wrapEl} aria-hidden="true">
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.ambient {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	canvas {
		display: block;
	}

	@media (max-width: 700px) {
		/* Terminal window covers the whole viewport here — nothing would show. */
		.ambient {
			display: none;
		}
	}
</style>
