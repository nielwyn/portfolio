<script lang="ts">
	import { onMount } from 'svelte';
	import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

	let canvasEl: HTMLCanvasElement;
	let wrapEl: HTMLDivElement;

	const FONT      = '14px "JetBrains Mono"';
	const FONT_BOLD = 'bold 14px "JetBrains Mono"';
	const LINE_H    = 22;
	const PAD       = 32;

	// Everforest Dark palette
	const C = {
		bg:     '#2D353B',
		bg1:    '#343F44',
		fg:     '#D3C6AA',
		green:  '#A7C080',
		aqua:   '#83C092',
		yellow: '#DBBC7F',
		blue:   '#7FBBB3',
		grey0:  '#7A8478',
		grey1:  '#859289',
		grey2:  '#9DA9A0',
		red:    '#E67E80',
		orange: '#E69875',
		purple: '#D699B6',
	};

	// ASCII art (left column)
	const ASCII_LINES = [
		{ t: '  ███╗   ██╗', c: C.green  },
		{ t: '  ████╗  ██║', c: C.green  },
		{ t: '  ██╔██╗ ██║', c: C.aqua   },
		{ t: '  ██║╚██╗██║', c: C.aqua   },
		{ t: '  ██║ ╚████║', c: C.blue   },
		{ t: '  ╚═╝  ╚═══╝', c: C.blue   },
		{ t: '             ', c: C.fg     },
		{ t: '  nielwyn', c: C.green  },
		{ t: '@portfolio', c: C.aqua   },
	];

	// Info lines (right column)
	type Span = { t: string; c: string; bold?: boolean };
	type InfoLine = Span[];

	const INFO_LINES: InfoLine[] = [
		[{ t: 'nielwyn', c: C.green, bold: true }, { t: '@', c: C.grey0 }, { t: 'portfolio', c: C.aqua, bold: true }],
		[{ t: '─'.repeat(20), c: C.bg1 }],
		[{ t: 'Role',    c: C.aqua }, { t: '    : ', c: C.grey1 }, { t: 'Developer',             c: C.fg }],
		[{ t: 'OS',      c: C.aqua }, { t: '      : ', c: C.grey1 }, { t: 'Arch Linux x86_64',    c: C.fg }],
		[{ t: 'Shell',   c: C.aqua }, { t: '   : ', c: C.grey1 }, { t: 'svelte + bun',           c: C.fg }],
		[{ t: 'Font',    c: C.aqua }, { t: '    : ', c: C.grey1 }, { t: 'JetBrains Mono',        c: C.fg }],
		[{ t: 'WM',      c: C.aqua }, { t: '      : ', c: C.grey1 }, { t: 'SvelteKit',            c: C.fg }],
		[{ t: 'Status',  c: C.aqua }, { t: '  : ', c: C.grey1 }, { t: 'Open to opportunities',  c: C.green }],
		[{ t: '', c: C.fg }],
		[
			{ t: '██', c: C.red    }, { t: ' ', c: C.bg },
			{ t: '██', c: C.orange }, { t: ' ', c: C.bg },
			{ t: '██', c: C.yellow }, { t: ' ', c: C.bg },
			{ t: '██', c: C.green  }, { t: ' ', c: C.bg },
			{ t: '██', c: C.aqua   }, { t: ' ', c: C.bg },
			{ t: '██', c: C.blue   }, { t: ' ', c: C.bg },
			{ t: '██', c: C.purple }, { t: ' ', c: C.bg },
			{ t: '██', c: C.fg     },
		],
	];

	type DrawCmd =
		| { kind: 'ascii'; row: number; col: number; char: string; color: string }
		| { kind: 'info';  row: number; spanIdx: number; charIdx: number; char: string; color: string; bold: boolean };

	// Build once — not on every frame
	function buildQueue(): DrawCmd[] {
		const q: DrawCmd[] = [];
		for (let r = 0; r < ASCII_LINES.length; r++) {
			for (let ci = 0; ci < ASCII_LINES[r].t.length; ci++) {
				q.push({ kind: 'ascii', row: r, col: ci, char: ASCII_LINES[r].t[ci], color: ASCII_LINES[r].c });
			}
		}
		for (let r = 0; r < INFO_LINES.length; r++) {
			const spans = INFO_LINES[r];
			for (let si = 0; si < spans.length; si++) {
				const s = spans[si];
				for (let ci = 0; ci < s.t.length; ci++) {
					q.push({ kind: 'info', row: r, spanIdx: si, charIdx: ci, char: s.t[ci], color: s.c, bold: !!s.bold });
				}
			}
		}
		return q;
	}

	const QUEUE = buildQueue();

	// Cache pretext preparations — prepareWithSegments is expensive; call once per unique (text, font) pair
	const _prepCache = new Map<string, ReturnType<typeof prepareWithSegments>>();
	function cachedPrep(text: string, font: string) {
		const key = `${font}\x00${text}`;
		if (!_prepCache.has(key)) _prepCache.set(key, prepareWithSegments(text, font));
		return _prepCache.get(key)!;
	}

	// Glitch effect — characters that temporarily show a random symbol
	const GLITCH_POOL = '!@#$%^&*<>?/\\|~`{}[]ABCDEFabcdef01289';
	type GlitchEntry = { qIdx: number; ch: string; life: number };
	let _glitches: GlitchEntry[] = [];
	let _glitchCooldown = 0;
	const GLITCH_EVERY  = 210; // frames between waves  (~3.5 s @ 60 fps)
	const GLITCH_N      = 5;   // chars per wave
	const GLITCH_LIFE   = 4;   // frames each glitch lives

	function spawnGlitchWave(done: number) {
		const eligible = Math.min(done, QUEUE.length);
		for (let i = 0; i < GLITCH_N; i++) {
			const idx = Math.floor(Math.random() * eligible);
			const cmd = QUEUE[idx];
			// Skip spaces, box-drawing chars, and separator dashes — they look odd glitched
			if (cmd.char === ' ' || cmd.char === '─' || cmd.char === '║' || cmd.char === '╗' || cmd.char === '╚' || cmd.char === '╝' || cmd.char === '═') continue;
			_glitches.push({
				qIdx: idx,
				ch:   GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)],
				life: GLITCH_LIFE,
			});
		}
	}

	function draw(
		ctx: CanvasRenderingContext2D,
		W: number,
		H: number,
		charsDone: number,
		cursorVisible: boolean,
		scanY: number,          // separator scan-line position (0..1), or -1 to hide
	) {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = C.bg;
		ctx.fillRect(0, 0, W, H);

		const sepX = PAD * 2 + 180;

		// — Separator with animated scan glow —
		// Base line
		ctx.strokeStyle = C.bg1;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(sepX, PAD);
		ctx.lineTo(sepX, H - PAD);
		ctx.stroke();

		if (scanY >= 0) {
			// Bright glowing dot travelling down the separator
			const sy = PAD + scanY * (H - 2 * PAD);
			const grad = ctx.createLinearGradient(0, sy - 24, 0, sy + 24);
			grad.addColorStop(0,   'rgba(131,192,146,0)');
			grad.addColorStop(0.5, 'rgba(131,192,146,0.55)');
			grad.addColorStop(1,   'rgba(131,192,146,0)');
			ctx.strokeStyle = grad;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(sepX, sy - 24);
			ctx.lineTo(sepX, sy + 24);
			ctx.stroke();
		}

		// Build active glitch lookup: qIdx → override char
		const glitchMap = new Map<number, string>();
		for (const g of _glitches) glitchMap.set(g.qIdx, g.ch);

		const done = Math.min(charsDone, QUEUE.length);

		// Reconstruct render state, applying glitch overrides
		const asciiState: string[][] = ASCII_LINES.map(l => new Array(l.t.length).fill(''));
		const infoState: string[][][] = INFO_LINES.map(line => line.map(s => new Array(s.t.length).fill('')));

		for (let i = 0; i < done; i++) {
			const cmd = QUEUE[i];
			const ch = glitchMap.has(i) ? glitchMap.get(i)! : cmd.char;
			if (cmd.kind === 'ascii') {
				asciiState[cmd.row][cmd.col] = ch;
			} else {
				infoState[cmd.row][cmd.spanIdx][cmd.charIdx] = ch;
			}
		}

		// — Draw ASCII column —
		const asciiX = PAD;
		for (let r = 0; r < ASCII_LINES.length; r++) {
			const y = PAD + r * LINE_H;
			ctx.font = FONT;
			if (r < 7) {
				ctx.fillStyle = ASCII_LINES[r].c;
				ctx.fillText(asciiState[r].join(''), asciiX, y + 14);
			} else if (r === 7) {
				ctx.fillStyle = ASCII_LINES[r].c;
				ctx.fillText(asciiState[r].join(''), asciiX + 2, y + 14);
			} else {
				// "@portfolio" drawn inline after "nielwyn" on row 7
				ctx.font = FONT;
				const nWidth = ctx.measureText('  nielwyn').width;
				ctx.fillStyle = ASCII_LINES[r].c;
				ctx.fillText(asciiState[r].join(''), asciiX + 2 + nWidth - ctx.measureText('  ').width, (PAD + 7 * LINE_H) + 14);
			}
		}

		// — Draw info column using pretext for accurate span widths —
		const infoX = sepX + PAD;
		const maxInfoW = W - infoX - PAD;

		for (let r = 0; r < INFO_LINES.length; r++) {
			const y = PAD + r * LINE_H + 14;
			let x = infoX;
			const spans = INFO_LINES[r];

			for (let si = 0; si < spans.length; si++) {
				const span = spans[si];
				const text = infoState[r][si].join('');
				if (!text) continue;

				const font = span.bold ? FONT_BOLD : FONT;
				ctx.font = font;
				ctx.fillStyle = span.c;
				ctx.fillText(text, x, y);

				// Use pretext to get accurate rendered width without touching the DOM
				const prepared = cachedPrep(text, font);
				const { lines } = layoutWithLines(prepared, maxInfoW, LINE_H);
				x += lines[0]?.width ?? ctx.measureText(text).width;
			}
		}

		// — Cursor —
		if (cursorVisible && done < QUEUE.length + 30) {
			const last = QUEUE[Math.min(done - 1, QUEUE.length - 1)];
			if (!last) return;

			let cursorX = 0;
			let cursorY = 0;

			if (last.kind === 'ascii') {
				cursorX = PAD + last.col * 8.5 + 8.5;
				cursorY = PAD + last.row * LINE_H;
			} else {
				let x = infoX;
				const spans = INFO_LINES[last.row];
				for (let si = 0; si <= last.spanIdx; si++) {
					const s = spans[si];
					const text = si < last.spanIdx
						? infoState[last.row][si].join('')
						: infoState[last.row][si].slice(0, last.charIdx + 1).join('');
					if (!text) continue;
					const font = s.bold ? FONT_BOLD : FONT;
					const prep = cachedPrep(text, font);
					const { lines } = layoutWithLines(prep, W, LINE_H);
					if (si < last.spanIdx) x += lines[0]?.width ?? 0;
					else cursorX = x + (lines[0]?.width ?? 0);
				}
				cursorY = PAD + last.row * LINE_H;
			}

			ctx.fillStyle = C.yellow;
			ctx.fillRect(cursorX, cursorY + 2, 8, LINE_H - 4);
		}
	}

	onMount(() => {
		const ctx = canvasEl.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;
		let W = 0, H = 260;

		function resize() {
			W = wrapEl.clientWidth;
			H = 260;
			canvasEl.width  = W * dpr;
			canvasEl.height = H * dpr;
			canvasEl.style.width  = `${W}px`;
			canvasEl.style.height = `${H}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		resize();
		window.addEventListener('resize', resize);

		const totalChars   = QUEUE.length;
		let charsDone      = 0;
		let cursorVisible  = true;
		let lastTick       = 0;
		const SPEED        = 6; // chars per frame

		// Separator scan animation
		let scanPhase   = 0;       // 0..1
		const SCAN_SPEED = 0.008;  // phase units per frame

		function tick(ts: number) {
			const delta = ts - lastTick;

			if (charsDone < totalChars) {
				// Typewriter phase
				if (delta > 16) {
					charsDone = Math.min(charsDone + SPEED, totalChars);
					lastTick = ts;
				}
			} else {
				// Idle phase — cursor blink
				if (delta > 500) {
					cursorVisible = !cursorVisible;
					lastTick = ts;
				}

				// Glitch wave
				_glitchCooldown++;
				if (_glitchCooldown >= GLITCH_EVERY) {
					_glitchCooldown = 0;
					spawnGlitchWave(charsDone);
				}
				// Age out glitches
				_glitches = _glitches.filter(g => { g.life--; return g.life > 0; });
			}

			// Separator scan runs always (starts fast during typewriter, looping after)
			scanPhase = (scanPhase + SCAN_SPEED) % 1;

			draw(ctx, W, H, charsDone, cursorVisible, scanPhase);
			requestAnimationFrame(tick);
		}

		requestAnimationFrame(tick);

		return () => window.removeEventListener('resize', resize);
	});
</script>

<div class="wrap" bind:this={wrapEl}>
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.wrap {
		width: 100%;
		background: var(--bg0);
		border: 1px solid var(--bg3);
		border-radius: 10px;
		overflow: hidden;
		line-height: 0;
	}

	canvas {
		display: block;
	}
</style>
