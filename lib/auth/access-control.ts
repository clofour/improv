import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

const statement = {
	...defaultStatements,
} as const;

export const accessControl = createAccessControl(statement);

export const helper = accessControl.newRole({});

export const reviewer = accessControl.newRole({});

export const fulfiller = accessControl.newRole({});
