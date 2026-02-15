import React from "react";
import FolderPreview from "./Folder-preview";
import { FaJs, FaCss3Alt, FaHtml5, FaFileAlt, FaFolder } from "react-icons/fa";

const files = [
	{ name: "index.html", icon: <FaHtml5 /> },
	{ name: "styles.css", icon: <FaCss3Alt /> },
	{ name: "app.js", icon: <FaJs /> },
	{ name: "README.md", icon: <FaFileAlt /> },
	{ name: "assets", icon: <FaFolder /> },
];

const FolderPreviewDemo: React.FC = () => (
	<div className="flex items-center justify-center min-h-[400px] w-full bg-gray-50 dark:bg-gray-900 py-16">
		<FolderPreview
			name="Project Files"
			variant="nandi"
			files={files}
			size="lg"
		/>
	</div>
);

export default FolderPreviewDemo;
