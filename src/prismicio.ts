import * as prismic from "@prismicio/client";

// import * as prismicNext from "@prismicio/next";

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
	// Examples:
	// {
	// 	type: "homepage",
	// 	path: "/",
	// },
	{
		type: "post",
		path: "/post/:uid",
	},
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
	const client = prismic.createClient("imperio-network", {
		routes,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN,
		fetchOptions: { cache: "no-cache" },
		...config,
	});

	/* prismicNext.enableAutoPreviews({
		client,
	}); */

	return client;
};
