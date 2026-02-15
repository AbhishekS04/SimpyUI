
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Twitter, Linkedin, Github } from "lucide-react";

interface TeamMember {
	name: string;
	role: string;
	image: string;
	twitter?: string;
	linkedin?: string;
	github?: string;
}

interface TeamCarouselProps {
	members: TeamMember[];
	autoPlay?: boolean;
	interval?: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
	members,
	autoPlay = false,
	interval = 3000
}) => {
	const [current, setCurrent] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	// Helper to handle circular indices
	const getIndex = (index: number) => {
		return (index + members.length) % members.length;
	};

	const next = () => {
		setCurrent((prev) => getIndex(prev + 1));
	};

	const prev = () => {
		setCurrent((prev) => getIndex(prev - 1));
	};

	useEffect(() => {
		if (!autoPlay || isHovered) return;
		const timer = setInterval(next, interval);
		return () => clearInterval(timer);
	}, [autoPlay, interval, isHovered, members.length]);

	// We'll render 3 visible cards: prev, current, next.
	// Actually, to get the effect in the image, we likely want to render all but style based on position.

	const getPositionStyles = (index: number) => {
		const diff = (index - current + members.length) % members.length;

		// Determine the "visual" position relative to current
		// We treat the carousel as circular.
		// If diff is 0 -> center
		// If diff is 1 or length-1 -> immediate neighbors
		// etc.

		// Simplified logic for "center", "left", "right", "hidden"
		// We need to handle the wrap-around correctly for determining visual distance.

		let visualDist = index - current;
		// Adjust for shortest path
		if (visualDist > members.length / 2) visualDist -= members.length;
		if (visualDist < -members.length / 2) visualDist += members.length;

		// Configuration for the styles
		if (visualDist === 0) {
			// CENTER
			return {
				x: 0,
				scale: 1.1,
				zIndex: 50,
				opacity: 1,
				filter: "grayscale(0%)",
				rotateY: 0,
				pointerEvents: "auto" as const
			};
		} else if (visualDist === -1) {
			// LEFT
			return {
				x: -220, // Adjust overlap
				scale: 0.85,
				zIndex: 40,
				opacity: 0.7,
				filter: "grayscale(100%)",
				rotateY: 15, // Slight tilt inward
				pointerEvents: "auto" as const
			};
		} else if (visualDist === 1) {
			// RIGHT
			return {
				x: 220,
				scale: 0.85,
				zIndex: 40,
				opacity: 0.7,
				filter: "grayscale(100%)",
				rotateY: -15, // Slight tilt inward
				pointerEvents: "auto" as const
			};
		} else {
			// HIDDEN / BACK
			return {
				x: visualDist < 0 ? -400 : 400,
				scale: 0.5,
				zIndex: 10,
				opacity: 0, // Hide others or fade them out deeply
				filter: "grayscale(100%)",
				rotateY: visualDist < 0 ? 30 : -30,
				pointerEvents: "none" as const
			};
		}
	};

	return (
		<div
			className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center perspective-1000 overflow-hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative w-full h-full flex items-center justify-center">
				{members.map((member, index) => {
					const style = getPositionStyles(index);
					// Only render if visible (opacity > 0) to save resources, or keep them for animations
					// For smooth animation, we render all but animate them.

					const isCenter = index === current;

					return (
						<motion.div
							key={index}
							className="absolute"
							initial={false}
							animate={style}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 25,
								mass: 1
							}}
							onClick={() => {

								if (index === getIndex(current - 1)) prev();
								else if (index === getIndex(current + 1)) next();
							}}
						>
							<div
								className={`
                    relative w-[280px] h-[400px] md:w-[320px] md:h-[460px] 
                    rounded-2xl overflow-hidden shadow-2xl 
                    transition-all duration-300
                    cursor-pointer
                    ${isCenter ? 'border-4 border-white/20' : 'border-0'}
                  `}
							>
								{/* Image takes full height */}
								<img
									src={member.image}
									alt={member.name}
									className="w-full h-full object-cover"
								/>

								{/* Gradient Overlay for Text Visibility */}
								<div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isCenter ? 'opacity-100' : ''}`} />

								{/* Content - Visible only on center card */}
								<div className={`
                        absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300
                        ${isCenter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                    `}>
									<h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
									<p className="text-purple-300 font-medium tracking-wide uppercase text-sm mb-4">{member.role}</p>

									<div className="flex gap-4">
										{member.twitter && (
											<motion.a
												href={member.twitter}
												target="_blank"
												className="group relative text-white/60 hover:text-[#1DA1F2] transition-colors"
												whileHover={{ scale: 1.3, rotate: 10 }}
												whileTap={{ scale: 0.95, rotate: -10 }}
												initial={{ scale: 1 }}
												animate={{ scale: 1 }}
											>
												<span className="absolute -inset-2 rounded-full bg-[#1DA1F2]/20 opacity-0 group-hover:opacity-80 transition-all duration-300 blur-sm"></span>
												<Twitter size={22} className="relative z-10 drop-shadow-lg" />
											</motion.a>
										)}
										{member.linkedin && (
											<motion.a
												href={member.linkedin}
												target="_blank"
												className="group relative text-white/60 hover:text-[#0077B5] transition-colors"
												whileHover={{ scale: 1.3, rotate: 10 }}
												whileTap={{ scale: 0.95, rotate: -10 }}
												initial={{ scale: 1 }}
												animate={{ scale: 1 }}
											>
												<span className="absolute -inset-2 rounded-full bg-[#0077B5]/20 opacity-0 group-hover:opacity-80 transition-all duration-300 blur-sm"></span>
												<Linkedin size={22} className="relative z-10 drop-shadow-lg" />
											</motion.a>
										)}
										{member.github && (
											<motion.a
												href={member.github}
												target="_blank"
												className="group relative text-white/60 hover:text-[#333] transition-colors"
												whileHover={{ scale: 1.3, rotate: 10 }}
												whileTap={{ scale: 0.95, rotate: -10 }}
												initial={{ scale: 1 }}
												animate={{ scale: 1 }}
											>
												<span className="absolute -inset-2 rounded-full bg-[#333]/20 opacity-0 group-hover:opacity-80 transition-all duration-300 blur-sm"></span>
												<Github size={22} className="relative z-10 drop-shadow-lg" />
											</motion.a>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Navigation Buttons - Styled as floating circles */}
			<button
				onClick={prev}
				className="absolute left-[10%] top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-all z-50 border border-white/10"
			>
				<ChevronLeft className="w-8 h-8" />
			</button>
			<button
				onClick={next}
				className="absolute right-[10%] top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-all z-50 border border-white/10"
			>
				<ChevronRight className="w-8 h-8" />
			</button>

			{/* Custom Styles */}
			<style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        `}</style>
		</div>
	);
};
