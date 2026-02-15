
import React from "react";
import Orbit from "./orbit";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGoogledrive, SiNotion } from "react-icons/si";

const githubImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/github.png?raw=true";
const vscodeImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/vscode.png?raw=true";
const cursorImg = "https://github.com/AbhishekS04/SimpyUI/blob/main/public/cursor.png?raw=true";

export default function OrbitDemo() {
	// Responsive Orbit size
	const [orbitSize, setOrbitSize] = React.useState(420);

	React.useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 640) {
				setOrbitSize(220);
			} else if (width < 1024) {
				setOrbitSize(320);
			} else {
				setOrbitSize(420);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] p-4 sm:p-8 rounded-xl w-full"
			style={{ maxWidth: "100vw", overflowX: "auto" }}
		>
			<Orbit
				size={orbitSize}
				centerImage={githubImg}
				centerSize={orbitSize > 300 ? 100 : 60}
				planets={[
					{
						image: vscodeImg,
						size: orbitSize > 300 ? 48 : 32,
						orbit: orbitSize > 300 ? 120 : 60,
						speed: 8,
						label: "Moon",
					},
					{
						image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/webstorm.png?raw=true",
						size: orbitSize > 300 ? 48 : 32,
						orbit: orbitSize > 300 ? 160 : 90,
						speed: 12,
						label: "WebStorm",
					},
					{
						image: cursorImg,
						size: orbitSize > 300 ? 48 : 32,
						orbit: orbitSize > 300 ? 200 : 120,
						speed: 16,
						label: "Cursor",
					},
					{
						image: "https://github.com/AbhishekS04/SimpyUI/blob/main/public/antigravity.jpg?raw=true",
						size: orbitSize > 300 ? 54 : 36,
						orbit: orbitSize > 300 ? 240 : 150,
						speed: 22,
						label: "Antigravity",
					},
				]}
			/>
		</div>
	);
}
