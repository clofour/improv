import Link, { LinkType } from "@/components/link";

interface UserSummaryProps {
	id: string;
	name: string;
}

export default function UserSummary({ id, name }: UserSummaryProps) {
	return (
		<Link type={LinkType.Internal} href={`/internal/users/${id}`}>
			<div className="w-full flex flex-row gap-2 px-2 py-1 border border-border">
				<div>PFP</div>
				<div>{name}</div>
			</div>
		</Link>
	);
}
