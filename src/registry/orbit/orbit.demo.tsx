
import React from "react";
import Orbit from "./orbit";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGoogledrive, SiNotion } from "react-icons/si";

const githubImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/github.png?raw=true";
const vscodeImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/vscode.png?raw=true";
const cursorImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/cursor.png?raw=true";

export default function OrbitDemo() {
	return (
		<div className="flex items-center justify-center min-h-[500px] p-8 rounded-xl">
			<Orbit
				size={420}
				centerImage={githubImg}
				centerSize={100}
				planets={[
					{
						image: vscodeImg,
						size: 48,
						orbit: 120,
						speed: 8,
						label: "Moon",
					},
					{
						image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/webstorm.png?raw=true",
						size: 48,
						orbit: 160,
						speed: 12,
						label: "WebStorm",
					},
					{
						image: cursorImg,
						size: 48,
						orbit: 200,
						speed: 16,
						label: "Cursor",
					},
					{
						image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/antigravity.jpg?raw=true",
						size: 54,
						orbit: 240,
						speed: 22,
						label: "Antigravity",
					},
				]}
			/>
		</div>
	);
}
