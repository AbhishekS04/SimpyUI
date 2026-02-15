import React from "react";
import { SocialFlipButton } from "./Social-flip-button";
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const socials = [
	{
		icon: <FaGithub />,
		label: "GitHub",
		href: "https://github.com/",
		className: "hover:bg-neutral-800",
	},
	{
		icon: <FaTwitter />,
		label: "Twitter",
		href: "https://twitter.com/",
		className: "hover:bg-sky-900",
	},
	{
		icon: <FaDiscord />,
		label: "Discord",
		href: "https://discord.com/",
		className: "hover:bg-indigo-900",
	},
	{
		icon: <FaLinkedin />,
		label: "LinkedIn",
		href: "https://linkedin.com/",
		className: "hover:bg-blue-900",
	},
	{
		icon: <FaInstagram />,
		label: "Instagram",
		href: "https://instagram.com/",
		className: "hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-400",
	},
	{
		icon: <MdMail />,
		label: "Mail",
		href: "mailto:example@mail.com",
		className: "hover:bg-emerald-900",
	},
];

const SocialFlipButtonDemo: React.FC = () => (
	<div className="flex gap-6 items-center justify-center py-8">
		{socials.map((s, i) => (
			<SocialFlipButton key={s.label} {...s} />
		))}
	</div>
);

export default SocialFlipButtonDemo;
