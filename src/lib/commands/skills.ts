import type { CommandDef } from './types';

export const skills: CommandDef = {
	name: 'skills',
	description: 'list my tech stack',
	execute: () => [
		{ type: 'section', content: 'Languages & Runtimes' },
		{ type: 'text', content: '  C#   Go   .NET' },
		{ type: 'text', content: '' },
		{ type: 'section', content: 'Architecture & Patterns' },
		{ type: 'text', content: '  DDD (Domain-Driven Design)   Event Sourcing   Actor Model' },
		{ type: 'text', content: '' },
		{ type: 'section', content: 'Cloud & Infrastructure' },
		{ type: 'text', content: '  Azure   AWS   Terraform (IaC)   Docker' },
		{ type: 'text', content: '' },
		{ type: 'section', content: 'OS & Tooling' },
		{ type: 'text', content: '  Linux / NixOS   Azure DevOps   Octopus Deploy   TeamCity   Jira' }
	]
};
