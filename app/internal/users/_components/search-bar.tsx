"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";

export default function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function updateQuery(term: string) {
		const newSearchParams = new URLSearchParams();

		if (term) {
			newSearchParams.set("q", term);
		}
		newSearchParams.delete("page");

		startTransition(() => {
			router.push(`?${newSearchParams.toString()}`);
		});
	}

	return <Input name="q" onChange={(e) => updateQuery(e.target.value)} />;
}
