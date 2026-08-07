import { err } from "@/lib/result";
import { CreateOrderSchema } from "@/lib/shop/schema";
import { createOrder } from "@/lib/shop/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const parse = CreateOrderSchema.safeParse(body);
	if (!parse.success) {
		return NextResponse.json(err(parse.error.issues.map((i) => i.message)), {
			status: 400,
		});
	}

	await createOrder(parse.data);
}
