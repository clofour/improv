import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
	...defaultStatements,
	internal: ["view"],
} as const;

export const accessControl = createAccessControl(statement);

export const helperRole = accessControl.newRole({});

export const reviewerRole = accessControl.newRole({});

export const fulfillerRole = accessControl.newRole({});

export const adminRole = accessControl.newRole({
	...adminAc.statements,
	internal: ["view"],
});
