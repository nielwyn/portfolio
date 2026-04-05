import type { CommandDef, OutputBlock } from './types';

const CWD = '/home/nielwyn';

const FILES: Record<string, string[]> = {
	'/home/nielwyn': ['about.txt', 'skills.txt', 'contact.txt', 'projects/'],
	'/home/nielwyn/projects': ['crypto-vibe-dashboard/', 'herond-relay-referral/', 'subtrack/']
};

const FILE_CONTENT: Record<string, () => OutputBlock[]> = {
	'about.txt': () => [
		{ type: 'text', content: 'Name:  Nielwyn' },
		{ type: 'text', content: 'Role:  Developer' },
		{ type: 'text', content: '' },
		{ type: 'text', content: "Run 'about' for the full bio." }
	],
	'skills.txt': () => [{ type: 'text', content: "Run 'skills' for the full list." }],
	'contact.txt': () => [{ type: 'text', content: "Run 'contact' for contact info." }]
};

export const pwd: CommandDef = {
	name: 'pwd',
	description: 'print working directory',
	execute: () => [{ type: 'text', content: CWD }]
};

export const ls: CommandDef = {
	name: 'ls',
	description: 'list directory contents',
	execute: (args) => {
		const flag = args.find((a) => a.startsWith('-'));
		const pathArg = args.find((a) => !a.startsWith('-'));
		const target = pathArg
			? pathArg.startsWith('/')
				? pathArg
				: `${CWD}/${pathArg}`.replace(/\/$/, '')
			: CWD;

		const entries = FILES[target];
		if (!entries) {
			return [{ type: 'error', content: `ls: cannot access '${pathArg}': No such file or directory` }];
		}

		const showLong = flag && flag.includes('l');

		if (showLong) {
			const now = new Date();
			const month = now.toLocaleString('en', { month: 'short' });
			const day = String(now.getDate()).padStart(2, ' ');
			const time = now.toTimeString().slice(0, 5);
			return [
				{ type: 'text', content: `total ${entries.length * 4}` },
				...entries.map((e) => {
					const isDir = e.endsWith('/');
					const name = isDir ? e.slice(0, -1) : e;
					const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
					const colored = isDir ? `\x1b[34m${name}\x1b[0m` : name;
					return {
						type: 'pre' as const,
						content: `${perms}  1 nielwyn nielwyn  ${isDir ? '4096' : ' 512'} ${month} ${day} ${time} ${name}`
					};
				})
			];
		}

		const line = entries
			.map((e) => {
				const isDir = e.endsWith('/');
				return isDir ? e : e;
			})
			.join('   ');

		return [{ type: 'pre', content: line }];
	}
};

export const cat: CommandDef = {
	name: 'cat',
	description: 'read a file',
	execute: (args) => {
		const file = args[0];
		if (!file) return [{ type: 'error', content: 'cat: missing operand' }];

		const name = file.replace(/^.*\//, '');
		const handler = FILE_CONTENT[name];
		if (!handler) {
			return [{ type: 'error', content: `cat: ${file}: No such file or directory` }];
		}
		return handler();
	}
};

export const echo: CommandDef = {
	name: 'echo',
	description: 'print text',
	execute: (args) => [{ type: 'text', content: args.join(' ') }]
};

export const date: CommandDef = {
	name: 'date',
	description: 'print current date and time',
	execute: () => [{ type: 'text', content: new Date().toString() }]
};

export const uname: CommandDef = {
	name: 'uname',
	description: 'print system info',
	execute: (args) => {
		if (args.includes('-a')) {
			return [{ type: 'text', content: 'Linux nielwyn 6.9.1-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' }];
		}
		return [{ type: 'text', content: 'Linux' }];
	}
};
