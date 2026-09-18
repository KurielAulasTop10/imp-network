import {
	RiBlueskyFill,
	RiFacebookFill,
	RiInstagramFill,
	RiSteamFill,
	RiThreadsFill,
	RiTwitchFill,
	RiTwitterXFill,
	RiWhatsappFill,
	RiYoutubeFill,
} from "react-icons/ri";

const SOCIALS = [
	{
		href: "https://www.threads.net/@imperionetwork6",
		icon: RiThreadsFill,
		label: "Threads",
	},
	{
		href: "https://www.instagram.com/imperionetwork6",
		icon: RiInstagramFill,
		label: "Instagram",
	},
	{
		href: "https://whatsapp.com/channel/0029VagzzeBBqbr3DWorwm1i",
		icon: RiWhatsappFill,
		label: "WhatsApp",
	},
	{
		href: "https://bsky.app/profile/imperionetwork.fr",
		icon: RiBlueskyFill,
		label: "Bluesky",
	},
	{ href: "https://x.com/imperionetwork6", icon: RiTwitterXFill, label: "X" },
	{
		href: "https://www.facebook.com/profile.php?id=61560538208689",
		icon: RiFacebookFill,
		label: "Facebook",
	},
	{
		href: "https://steamcommunity.com/groups/imperionetwork",
		icon: RiSteamFill,
		label: "Steam",
	},
	{
		href: "https://www.youtube.com/@imperionetwork",
		icon: RiYoutubeFill,
		label: "YouTube",
	},
	{
		href: "https://www.twitch.tv/imp3rionetwork",
		icon: RiTwitchFill,
		label: "Twitch",
	},
];

export default function SocialRow() {
	return (
		<ul className="flex flex-wrap items-center gap-px">
			{SOCIALS.map(({ href, icon: Icon, label }) => (
				<li key={href}>
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={label}
						className="flex size-11 items-center justify-center text-ink-2 transition-colors duration-200 ease-out hover:bg-surface-2 hover:text-brand-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
					>
						<Icon aria-hidden="true" className="size-4.5" />
					</a>
				</li>
			))}
		</ul>
	);
}
