import * as prismic from "@prismicio/client";

const routes: prismic.ClientConfig["routes"] = [
	{
		type: "post",
		path: "/post/:uid",
	},
];

export const createClient = (config: prismic.ClientConfig = {}) => {
	const client = prismic.createClient("imperio-network", {
		routes,
		accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
		// fetchOptions: { cache: "force-cache" },
		...config,
	});

	return client;
};
