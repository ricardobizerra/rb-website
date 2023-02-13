import { RBLogoImg } from "@/assets";
import Image from "next/image";
import React from "react";

const RBLogo: React.FC = () => {
	return (
		<div
			className="flex items-center justify-center gap-2
			bg-blueMain text-white
			font-medium text-lg
			px-4 py-2
			w-fit rounded-3xl"
		>
			<Image
				src={RBLogoImg}
				alt="RB Logo"
				height={18}
			/>
			<p>•</p>
			<h1>Ricardo Bizerra</h1>
		</div>
	);
}

export default RBLogo;
