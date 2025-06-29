import * as Sentry from "@sentry/nextjs";

export async function register() {
	Sentry.init({
		dsn: "https://771b5dc05de86fa8cda7c282721682dc@o4508978647597056.ingest.de.sentry.io/4508978649366608",

		// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
		tracesSampleRate: 1,

		// Setting this option to true will print useful information to the console while you're setting up Sentry.
		debug: false,
	});
}



export const onRequestError = Sentry.captureRequestError;
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
