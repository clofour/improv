import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface FormButtonProps {
	defaultText: string;
	loadingText: string;
}

export default function FormButton({
	defaultText,
	loadingText,
}: FormButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending}>
			{pending ? loadingText : defaultText}
		</Button>
	);
}
