enum CurrencyType {
	Logo,
}

interface CurrencyProps {
	type: CurrencyType;
}

export default function Currency({ type }: CurrencyProps) {
	switch (type) {
		case CurrencyType.Logo:
			return (
				<svg
					aria-label="Uptime"
					height="20px"
					fill="var(--primary)"
					viewBox="0 0 160 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="0" y="130" width="40" height="60" rx="4" />
					<rect x="60" y="70" width="40" height="120" rx="4" />
					<rect x="120" y="10" width="40" height="180" rx="4" />
				</svg>
			);
	}
}
