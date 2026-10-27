import { OnboardingState } from "../users/service";

export function isOnboardingComplete(onboardingState: OnboardingState) {
	return !onboardingState.some((step) => step.status == false);
}
