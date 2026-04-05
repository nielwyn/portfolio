import { writable } from 'svelte/store';
import { dispatch } from '$lib/commands/index';
import type { OutputBlock } from '$lib/commands/types';

export interface HistoryEntry {
	id: number;
	input: string;
	blocks: OutputBlock[];
}

interface TerminalState {
	history: HistoryEntry[];
	inputLog: string[];
	inputLogIndex: number;
}

let nextId = 1;

function createTerminalStore() {
	const { subscribe, update } = writable<TerminalState>({
		history: [],
		inputLog: [],
		inputLogIndex: -1
	});

	function submitCommand(raw: string) {
		const trimmed = raw.trim();
		if (!trimmed) return;

		update((state) => {
			const blocks = dispatch(trimmed);

			// handle clear sentinel
			if (blocks.length === 1 && blocks[0].content === '__CLEAR__') {
				return {
					...state,
					history: [],
					inputLog: [trimmed, ...state.inputLog],
					inputLogIndex: -1
				};
			}

			const entry: HistoryEntry = { id: nextId++, input: trimmed, blocks };
			return {
				history: [...state.history, entry],
				inputLog: [trimmed, ...state.inputLog],
				inputLogIndex: -1
			};
		});
	}

	function historyUp(currentDraft: string): string {
		let result = currentDraft;
		update((state) => {
			const next = Math.min(state.inputLogIndex + 1, state.inputLog.length - 1);
			result = state.inputLog[next] ?? currentDraft;
			return { ...state, inputLogIndex: next };
		});
		return result;
	}

	function historyDown(currentDraft: string): string {
		let result = '';
		update((state) => {
			const next = state.inputLogIndex - 1;
			if (next < 0) {
				result = currentDraft;
				return { ...state, inputLogIndex: -1 };
			}
			result = state.inputLog[next] ?? '';
			return { ...state, inputLogIndex: next };
		});
		return result;
	}

	return { subscribe, submitCommand, historyUp, historyDown };
}

export const terminal = createTerminalStore();
