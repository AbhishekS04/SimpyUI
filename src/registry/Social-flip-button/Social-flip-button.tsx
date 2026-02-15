import React from "react";

export interface SocialFlipButtonProps {
	icon: React.ReactNode;
	label: string;
	href?: string;
	className?: string;
}

export const SocialFlipButton: React.FC<SocialFlipButtonProps> = ({
	icon,
	label,
	href,
	className = "",
}) => {
	const content = (
		<button
			className={`relative group w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 ${className}`}
			tabIndex={0}
			aria-label={label}
		>
			{/* Front Side */}
			<span
				className="absolute inset-0 flex items-center justify-center text-2xl text-white transition-transform duration-500 group-hover:rotate-y-180 group-focus:rotate-y-180"
				style={{ backfaceVisibility: "hidden" }}
			>
				{icon}
			</span>
			{/* Back Side */}
			<span
				className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-400 bg-neutral-950/90 rounded-full rotate-y-180 transition-transform duration-500 group-hover:rotate-y-0 group-focus:rotate-y-0"
				style={{ backfaceVisibility: "hidden" }}
			>
				{label}
			</span>
			<style>{`
				.group:hover .group-hover\\:rotate-y-180, .group:focus .group-focus\\:rotate-y-180 {
					transform: rotateY(180deg);
				}
				.group:hover .group-hover\\:rotate-y-0, .group:focus .group-focus\\:rotate-y-0 {
					transform: rotateY(0deg);
				}
				.group-hover\\:rotate-y-180 {
					transform: rotateY(0deg);
				}
				.group-hover\\:rotate-y-0 {
					transform: rotateY(180deg);
				}
			`}</style>
		</button>
	);
	if (href) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
				{content}
			</a>
		);
	}
	return content;
};
export default SocialFlipButton;
