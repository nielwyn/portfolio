import type { CommandDef } from './types';

// Renamed to "work" — registered in index.ts under both "work" and "projects"
export const work: CommandDef = {
	name: 'work',
	description: 'work history',
	execute: () => [
		{ type: 'section', content: 'Freelancer @ Volvo / Flixen AB  [2023-07 → present]' },
		{ type: 'text', content: '  Part of the Energy Device Cloud team at Volvo.' },
		{ type: 'text', content: '  Built an OCPP server in .NET using Orleans actor system.' },
		{ type: 'text', content: '  Infrastructure on AWS with Terraform for IaC.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Freelancer @ Chargenode EU / Flixen AB  [2023-02 → 2023-06]' },
		{ type: 'text', content: '  EV charger provider — hardware to customer portal.' },
		{ type: 'text', content: '  Highly scalable Azure system for 100k+ chargers using the actor model.' },
		{ type: 'text', content: '  Maintained existing .NET mainline.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Freelancer @ Worldstream / Flixen AB  [2022-03 → 2023-02]' },
		{ type: 'text', content: '  Netherlands-based infrastructure provider.' },
		{ type: 'text', content: '  Event-sourced system in Go — traceability-first, high performance.' },
		{ type: 'text', content: '  Stack: Go, event sourcing, Docker.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Senior Developer @ Evolve Technology / AFRY  [2020-03 → 2022-08]' },
		{ type: 'text', content: '  Agile software development, identity & security management.' },
		{ type: 'text', content: '  Med-tech client: live patient health monitoring in C# / Azure.' },
		{ type: 'text', content: '  Infra client: event-sourced Go system for performance & traceability.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Azure Integration @ CXC (Deloitte Australia)  [2019-05 → 2020-02]' },
		{ type: 'text', content: '  Application development stream lead.' },
		{ type: 'text', content: '  Cloud infra troubleshooting, platform config, cross-team collab.' },
		{ type: 'text', content: '  ITSM: incident & problem management via VSTS / Jira.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Tech Lead @ Collector Bank  [2016-01 → 2019-01]' },
		{ type: 'text', content: '  Co-developed core banking system.' },
		{ type: 'text', content: '  Cloud infra, security, CI/CD pipelines.' },
		{ type: 'text', content: '  Azure DevOps + Octopus Deploy.' },
		{ type: 'text', content: '' },

		{ type: 'section', content: 'Azure Integration @ Collector Bank  [2015-05 → 2016-06]' },
		{ type: 'text', content: '  Built, tested, and deployed cloud services.' },
		{ type: 'text', content: '  TeamCity, Jira, Octopus Deploy.' }
	]
};
