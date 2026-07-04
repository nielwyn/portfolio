export const person = {
	name: 'Nielwyn',
	role: 'Senior Software Engineer',
	handle: 'nielwyn',
	experienceYears: 10,
	pitch:
		'I build backend systems and cloud infrastructure that stay reliable in production — ' +
		'from EV-charging networks to core banking platforms.',
	status: 'Open to senior and technical lead roles, remote or on-site.'
};

export const about = {
	paragraphs: [
		'Senior developer with ten years of experience building distributed systems and cloud ' +
			'infrastructure across Sweden, the Netherlands, and Australia.',
		"Currently freelancing with Volvo's Energy Device Cloud team, building the backend that " +
			'connects EV chargers to the cloud in real time. Previously built the platform behind a ' +
			'100,000+ charger network, and cloud systems for banking and healthcare clients.',
		'I like distributed systems and clean architecture — but what I actually care about is ' +
			'shipping things that work reliably in production.'
	]
};

export const skills = [
	{ label: 'Languages',              items: ['C#', 'Go', '.NET', 'TypeScript'] },
	{ label: 'Architecture & Patterns', items: ['Domain-Driven Design', 'Event Sourcing', 'Actor Model', 'CQRS'] },
	{ label: 'Cloud & Infrastructure', items: ['Azure', 'AWS', 'Terraform', 'Docker'] },
	{ label: 'Frontend',               items: ['Svelte / SvelteKit', 'React', 'TypeScript'] },
	{ label: 'Tooling & OS',           items: ['Linux', 'Azure DevOps', 'Octopus Deploy', 'Git'] }
];

export const workHistory = [
	{
		role: 'Freelance Backend Engineer',
		place: 'Volvo (via Flixen AB)',
		from: 'Jul 2023',
		to: null,
		summary:
			"Building the backend for Volvo's EV charging network, as part of the Energy Device " +
			'Cloud team — handles real-time communication between charging stations and the cloud.',
		stack: ['.NET', 'Orleans', 'AWS', 'Terraform']
	},
	{
		role: 'Freelance Backend Engineer',
		place: 'Chargenode EU (via Flixen AB)',
		from: 'Feb 2023',
		to: 'Jun 2023',
		summary:
			'Built and scaled the cloud platform behind a network of 100,000+ EV chargers, from ' +
			'hardware to customer portal.',
		stack: ['.NET', 'Azure', 'Actor Model']
	},
	{
		role: 'Freelance Backend Engineer',
		place: 'Worldstream (via Flixen AB)',
		from: 'Mar 2022',
		to: 'Feb 2023',
		summary:
			'Built a high-performance backend for a Netherlands-based infrastructure provider, ' +
			'designed so every change is fully traceable.',
		stack: ['Go', 'Event Sourcing', 'Docker']
	},
	{
		role: 'Senior Developer',
		place: 'Evolve Technology / AFRY',
		from: 'Mar 2020',
		to: 'Aug 2022',
		summary:
			'Led development on identity & security systems, including live patient monitoring for ' +
			'a med-tech client and a high-traceability backend for an infrastructure client.',
		stack: ['C#', 'Azure', 'Go']
	},
	{
		role: 'Azure Integration',
		place: 'CXC (Deloitte Australia)',
		from: 'May 2019',
		to: 'Feb 2020',
		summary:
			'Led the application development stream — cloud infrastructure, platform config, and ' +
			'incident response across teams.',
		stack: ['Azure', 'VSTS', 'Jira']
	},
	{
		role: 'Tech Lead',
		place: 'Collector Bank',
		from: 'Jan 2016',
		to: 'Jan 2019',
		summary:
			"Co-developed the bank's core banking system and led cloud infrastructure, security, " +
			'and CI/CD for the platform.',
		stack: ['Azure', 'Azure DevOps', 'Octopus Deploy']
	},
	{
		role: 'Azure Integration',
		place: 'Collector Bank',
		from: 'May 2015',
		to: 'Jun 2016',
		summary: "Built, tested, and deployed cloud services for the bank's platform.",
		stack: ['Azure', 'TeamCity', 'Octopus Deploy']
	}
];

export const projects = [
	{
		name: 'crypto-vibe-dashboard',
		blurb: 'Real-time crypto market dashboard.',
		stack: ['SvelteKit', 'TypeScript', 'WebSocket'],
		href: 'https://github.com/nielwyn/crypto-vibe-dashboard'
	},
	{
		name: 'herond-relay-referral',
		blurb: 'Referral system for a browser relay network.',
		stack: ['Go', 'PostgreSQL', 'Docker'],
		href: 'https://github.com/nielwyn/herond-relay-referral'
	},
	{
		name: 'subtrack',
		blurb: 'Subscription tracker — never miss a renewal.',
		stack: ['SvelteKit', 'Bun', 'SQLite'],
		href: 'https://github.com/nielwyn/subtrack'
	}
];

export const contact = [
	{ label: 'GitHub',   href: 'https://github.com/nielwyn',     value: 'github.com/nielwyn' },
	{ label: 'Email',    href: 'mailto:hello@nielwyn.dev',       value: 'hello@nielwyn.dev' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/nielwyn', value: 'linkedin.com/in/nielwyn' }
];
