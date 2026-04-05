export const person = {
	name: 'Nielwyn',
	role: 'Developer',
	handle: 'nielwyn'
};

export const skills = [
	{ label: 'Languages',    items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'SQL'] },
	{ label: 'Frontend',     items: ['Svelte / SvelteKit', 'React', 'Vite', 'Tailwind CSS'] },
	{ label: 'Backend',      items: ['Go (net/http, chi)', 'Node.js', 'PostgreSQL', 'Redis'] },
	{ label: 'Tools & Infra',items: ['Git', 'Docker', 'Linux', 'GitHub Actions'] }
];

export const workHistory = [
	{
		role: 'Freelancer',
		place: 'Volvo / Flixen AB',
		from: 'Jul 2023',
		to: null,
		items: [
			'Part of the Energy Device Cloud team at Volvo.',
			'Built an OCPP server in .NET using the Orleans actor system.',
			'Infrastructure on AWS with Terraform for IaC.'
		]
	},
	{
		role: 'Freelancer',
		place: 'Chargenode EU / Flixen AB',
		from: 'Feb 2023',
		to: 'Jun 2023',
		items: [
			'EV charger provider — hardware to customer portal.',
			'Highly scalable Azure system for 100k+ chargers using the actor model.',
			'Maintained existing .NET mainline.'
		]
	},
	{
		role: 'Freelancer',
		place: 'Worldstream / Flixen AB',
		from: 'Mar 2022',
		to: 'Feb 2023',
		items: [
			'Netherlands-based infrastructure provider.',
			'Event-sourced system in Go — traceability-first, high performance.',
			'Stack: Go, event sourcing, Docker.'
		]
	},
	{
		role: 'Senior Developer',
		place: 'Evolve Technology / AFRY',
		from: 'Mar 2020',
		to: 'Aug 2022',
		items: [
			'Agile software development, identity & security management.',
			'Med-tech client: live patient health monitoring in C# / Azure.',
			'Infra client: event-sourced Go system for performance & traceability.'
		]
	},
	{
		role: 'Azure Integration',
		place: 'CXC (Deloitte Australia)',
		from: 'May 2019',
		to: 'Feb 2020',
		items: [
			'Application development stream lead.',
			'Cloud infra troubleshooting, platform config, cross-team collab.',
			'ITSM: incident & problem management via VSTS / Jira.'
		]
	},
	{
		role: 'Tech Lead',
		place: 'Collector Bank',
		from: 'Jan 2016',
		to: 'Jan 2019',
		items: [
			'Co-developed core banking system.',
			'Cloud infra, security, CI/CD pipelines.',
			'Azure DevOps + Octopus Deploy.'
		]
	},
	{
		role: 'Azure Integration',
		place: 'Collector Bank',
		from: 'May 2015',
		to: 'Jun 2016',
		items: [
			'Built, tested, and deployed cloud services.',
			'TeamCity, Jira, Octopus Deploy.'
		]
	}
];

export const contact = [
	{ label: 'GitHub',   href: 'https://github.com/nielwyn',          value: 'github.com/nielwyn' },
	{ label: 'Email',    href: 'mailto:hello@nielwyn.dev',             value: 'hello@nielwyn.dev' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/nielwyn',      value: 'linkedin.com/in/nielwyn' }
];
