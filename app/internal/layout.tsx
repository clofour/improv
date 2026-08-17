import { checkPermissions, getSession } from "@/lib/auth/utils";
import CenterContent from "./_components/center-content";
import Navbar from "./_components/navbar";

export default async function InternalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	if (!session.ok) return null;
	const authorization = await checkPermissions(session.data.user.id, {
		internal: ["view"],
	});
	if (!authorization.ok || !authorization.data) return null;

	return (
		<div>
			<Navbar />

			<div className="w-full h-full flex flex-col items-center">
				<CenterContent>{children}</CenterContent>
			</div>
		</div>
	);
}
