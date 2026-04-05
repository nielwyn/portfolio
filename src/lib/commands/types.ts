export type NeofetchInfoRow =
	| { label: string; value: string }
	| { rowType: 'colors' }
	| null;

export interface NeofetchData {
	avatar?: string;
	username: string;
	host: string;
	info: NeofetchInfoRow[];
}

export interface OutputBlock {
	type: 'text' | 'pre' | 'link' | 'error' | 'section' | 'neofetch';
	content: string;
	href?: string;
	neofetchData?: NeofetchData;
}

export interface CommandDef {
	name: string;
	description: string;
	execute: (args: string[]) => OutputBlock[];
}
