import type { CommandDef, OutputBlock } from './types';
import { help, setGetAll } from './help';
import { about } from './about';
import { skills } from './skills';
import { work, projects } from './projects';
import { contact } from './contact';
import { whoami } from './whoami';
import { clear } from './clear';
import { neofetch } from './neofetch';
import { pwd, ls, cat, echo, date, uname } from './fs';

const sudo: CommandDef = {
	name: 'sudo',
	description: 'run command as root',
	hidden: true,
	execute: (args) => {
		if (args[0] === 'rm' && args.includes('-rf')) {
			return [
				{ type: 'text',  content: '[sudo] password for nielwyn:' },
				{ type: 'error', content: 'nielwyn is not in the sudoers file. This incident will be reported.' }
			];
		}
		return [
			{ type: 'error', content: `sudo: permission denied — nice try.` }
		];
	}
};

const man: CommandDef = {
	name: 'man',
	description: 'manual pages',
	hidden: true,
	execute: (args) => {
		const cmd = args[0];
		if (!cmd) return [{ type: 'error', content: 'What manual page do you want?' }];
		return [
			{ type: 'section', content: `man ${cmd}` },
			{ type: 'text',    content: '' },
			{ type: 'text',    content: `No manual entry for ${cmd}.` },
			{ type: 'text',    content: "Try 'help' for a list of built-in commands." }
		];
	}
};

const registry = new Map<string, CommandDef>([
	['help',     help],
	['neofetch', neofetch],
	['about',    about],
	['whoami',   whoami],
	['skills',   skills],
	['work',     work],
	['projects', projects],
	['contact',  contact],
	['clear',    clear],
	['pwd',      pwd],
	['ls',       ls],
	['cat',      cat],
	['echo',     echo],
	['date',     date],
	['uname',    uname],
	['sudo',     sudo],
	['man',      man]
]);

setGetAll(() => [...registry.values()]);

export function dispatch(raw: string): OutputBlock[] {
	const trimmed = raw.trim();
	if (!trimmed) return [];

	const parts = trimmed.split(/\s+/);
	const name = parts[0].toLowerCase();
	const args = parts.slice(1);

	const cmd = registry.get(name);
	if (!cmd) {
		return [
			{
				type: 'error',
				content: `command not found: ${name}  (type 'help' for available commands)`
			}
		];
	}
	return cmd.execute(args);
}

export function getCommands(): CommandDef[] {
	return [...registry.values()];
}
