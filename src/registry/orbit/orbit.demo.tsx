
import React from "react";
import Orbit from "./orbit";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGoogledrive, SiNotion } from "react-icons/si";

const earthImg = "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg";
const moonImg = "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg";

export default function OrbitDemo() {
	return (
		<div className="flex items-center justify-center min-h-[500px] bg-black p-8 rounded-xl">
			<Orbit
				size={420}
				centerImage={earthImg}
				centerSize={100}
				planets={[
					{
						image: moonImg,
						size: 48,
						orbit: 120,
						speed: 8,
						label: "Moon",
					},
					{
						icon: <SiNotion size={36} className="text-white bg-black rounded" />, // Notion
						size: 48,
						orbit: 160,
						speed: 12,
						label: "Notion",
					},
					{
						icon: <FaWhatsapp size={36} className="text-green-500 bg-white rounded-full" />, // WhatsApp
						size: 48,
						orbit: 120,
						speed: 10,
						label: "WhatsApp",
					},
					{
						icon: <SiGoogledrive size={40} className="text-[#0F9D58] bg-white rounded" />, // Google Drive
						size: 54,
						orbit: 200,
						speed: 14,
						label: "Drive",
					},
					{
						icon: <FaGithub size={36} className="text-black bg-white rounded-full" />, // GitHub
						size: 48,
						orbit: 160,
						speed: 16,
						label: "GitHub",
					},
				]}
			/>
		</div>
	);
}
