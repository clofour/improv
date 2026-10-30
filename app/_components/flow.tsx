import NameSection from "./name-section";

const columns = [
	[
		{
			id: "need",
			title: "look around you",
			description:
				"what annoys you on a daily basis? expensive hosting? unreliable services? missing features?",
		},
	],
	[
		{
			id: "new",
			title: "create your own provisioning tools",
			description:
				"container orchestrators, image builders, CI/CD pipelines, PaaS, game hosting services... the sky's the limit!",
		},
		{
			id: "existing",
			title: "get started with existing provisioning tools",
			description:
				"Terraform, OpenTofu, Ansible, cloud-init, Dockerfiles, Nix... anything you can think of!",
		},
	],
	[
		{
			id: "ship",
			title: "ship your project",
			description:
				"create a demo, add a README and make sure your project meets the guidelines before submitting it.",
		},
	],
	[
		{
			id: "uptime",
			title: "receive uptime and discounts",
			description:
				"the bigger and the more complex your project is, the more uptime you earn.",
		},
	],
	[
		{
			id: "shop",
			title: "redeem prizes",
			description:
				"spend your uptime in the shop. if your project is relevant to the shop item, you can use your discount vouchers on it.",
		},
	],
];

export default function Flow() {
	return (
		<NameSection
			id="how"
			title="how it works"
			description="start with one of the suggested projects, or pick an infra problem you want to solve. build it, ship it and earn uptime + discounts."
			aside="right"
		>
			<div className="flex flex-col">
				{columns.map((column, columnIndex, columns) =>
					column.map((step, stepIndex, steps) => (
						<div key={step.id} className="flex flex-row gap-5">
							<div className="flex flex-col items-center">
								<div className="size-9 shrink-0 flex items-center justify-center border border-primary bg-primary/10 text-sm text-primary font-mono lowercase">
									{steps.length === 1
										? columnIndex + 1
										: `${columnIndex + 1}${String.fromCharCode(65 + stepIndex)}`}
								</div>
								{stepIndex < steps.length - 1 ? (
									<div className="w-px grow min-h-8 relative bg-border">
										<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-1 bg-background text-xs text-muted-foreground font-mono">
											OR
										</span>
									</div>
								) : columnIndex < columns.length - 1 ? (
									<div className="w-px grow min-h-8 bg-border" />
								) : null}
							</div>
							<div className="flex flex-col gap-1 pt-1.5 pb-6">
								<p className="text-lg font-heading font-bold leading-tight">
									{step.title}
								</p>
								<p className="text-base text-muted-foreground">
									{step.description}
								</p>
							</div>
						</div>
					)),
				)}
			</div>
		</NameSection>
	);
}
