import { ProjectType } from "./project";

const CURRENCY_DOLLAR_RATE = 2;
const BASE_RATE = 4;
const DISCOUNT_RATE = 6;
const DELTA_RATE = DISCOUNT_RATE - BASE_RATE;
const DELTA_CURRENCY = DELTA_RATE * CURRENCY_DOLLAR_RATE;
const PROJECT_RATE = {
	[ProjectType.Beginner]: {
		base: 7,
		discount: 3,
	},
	[ProjectType.Advanced]: {
		base: 10,
		discount: 2,
	},
};

export function calculateBasePrice(value: number) {
	return value * CURRENCY_DOLLAR_RATE;
}

export function calculateDiscount(type: ProjectType, length: number) {
	return PROJECT_RATE[type].discount * length;
}
