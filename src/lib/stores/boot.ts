import { writable } from 'svelte/store';

export const bootComplete = writable<boolean>(false);
