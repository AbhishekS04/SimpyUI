
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
	autoPlay = true,
	interval = 3000
}) => {
	const [current, setCurrent] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const next = () => {
		setCurrent((prev) => (prev + 1) % members.length);
	};

	const prev = () => {
		setCurrent((prev) => (prev - 1 + members.length) % members.length);
	};

	useEffect(() => {
		if (!autoPlay || isHovered) return;
		const timer = setInterval(next, interval);
		return () => clearInterval(timer);
	}, [autoPlay, interval, isHovered, members.length]);

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.5,
			rotateY: direction > 0 ? 45 : -45,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1,
			rotateY: 0,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.5,
			rotateY: direction < 0 ? 45 : -45,
		}),
	};

	return (
		<div
			className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center perspective-1000"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="absolute inset-0 flex items-center justify-center">
				<AnimatePresence initial={false} mode="popLayout" custom={current}>
					<motion.div
						key={current}
						custom={current}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
							rotateY: { duration: 0.4 },
						}}
						className="absolute w-[300px] md:w-[350px] h-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center cursor-grab active:cursor-grabbing hover:border-white/20 transition-all duration-500 group/card"
						style={{ transformStyle: "preserve-3d" }}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={(e, { offset, velocity }) => {
							const swipe = Math.abs(offset.x) * velocity.x;
							if (swipe < -10000) next();
							else if (swipe > 10000) prev();
						}}
					>
						{/* Image with animated gradient glow */}
						<div className="relative mb-6 group">
							<div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
							<img
								src={members[current].image}
								alt={members[current].name}
								className="relative w-32 h-32 rounded-full object-cover border-4 border-white/10 group-hover:border-white/30 transition-colors shadow-lg pointer-events-none"
							/>
						</div>

						{/* Text Content */}
						<motion.h3
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="text-2xl font-bold text-white mb-1 pointer-events-none"
						>
							{members[current].name}
						</motion.h3>
						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-sm mb-6 uppercase tracking-widest font-bold pointer-events-none"
						>
							{members[current].role}
						</motion.p>

						<div className="px-4 mb-6 relative">
							<p className="text-white/70 text-sm line-clamp-3 italic leading-relaxed">
								"Passionate about creating beautiful user experiences and writing clean, maintainable code."
							</p>
						</div>


						{/* Social Links */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="flex gap-4 mt-auto"
						>
							{members[current].twitter && (
								<a
									href={members[current].twitter}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2.5 bg-white/5 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all duration-300 text-white/50 group"
								>
									<Twitter className="w-4 h-4" />
								</a>
							)}
							{members[current].linkedin && (
								<a
									href={members[current].linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2.5 bg-white/5 rounded-full hover:bg-[#0077B5] hover:text-white hover:scale-110 transition-all duration-300 text-white/50 group"
								>
									<Linkedin className="w-4 h-4" />
								</a>
							)}
							{members[current].github && (
								<a
									href={members[current].github}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2.5 bg-white/5 rounded-full hover:bg-[#333] hover:text-white hover:scale-110 transition-all duration-300 text-white/50 group"
								>
									<Github className="w-4 h-4" />
								</a>
							)}
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation Buttons with Gradient Border Effect */}
			<div className="absolute bottom-10 flex gap-8 z-20">
				<button
					onClick={prev}
					className="relative px-4 py-4 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all duration-300 group overflow-hidden"
				>
					<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
					<div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
					<ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
				</button>
				<button
					onClick={next}
					className="relative px-4 py-4 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all duration-300 group overflow-hidden"
				>
					<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
					<div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
					<ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
				</button>
			</div>



			{/* Custom Styles */}
			<style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1s infinite;
        }
        `}</style>
		</div>
	);
};
