import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface AuthButtonProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
}

export default function AuthButton({ variant, size }: AuthButtonProps) {
	return (
		<Button variant={variant} size={size}>
			Sign In
		</Button>
	);
}
