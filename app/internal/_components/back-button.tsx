"use client";

import { LinkType } from "@/components/link";
import LinkButton from "@/components/link-button";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export default function BackButton() {
	return (
		<LinkButton
			type={LinkType.Internal}
			variant="ghost"
			size="lg"
			href="/internal/users"
		>
			<ArrowLeftIcon />
		</LinkButton>
	);
}
