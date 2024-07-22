import type { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "../../../prismicio";

export async function GET(request: NextRequest) {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
	});

	return await redirectToPreviewURL({ client, request });
}
