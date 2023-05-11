import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type SocialMediaType = {
	imageSrc: any;
	imageAlt: string;
	color: string;
	redirectLink: string;
};

export default function SocialMediaMenu() {

	const [socialMediaList, setSocialMediaList] = useState<[]>([]);

	useEffect(() => {
		axios.get('/api/v1/social-media')
		.then(res => {
			const dataFromGet = res.data;
			setSocialMediaList(dataFromGet);
		})
		.catch(err => console.log(err))
	}, [])

	return (
		<>
			<HorizontalLine />

			<div
				className="flex justify-center items-center gap-4"
			>
				{socialMediaList?.map(({ imageSrc, imageAlt, color, redirectLink }: SocialMediaType) => (
					<a
						href={redirectLink}
						className={`flex justify-center items-center rounded-[5px] p-2 w-12 h-12`}
						key={imageAlt}
						style={
							{
								backgroundColor: color
							}
						}
					>
						<Image
							src={imageSrc}
							alt={imageAlt}
							width={32}
						/>
					</a>
				))}
			</div>

			<HorizontalLine />
		</>
	);
}

function HorizontalLine() {
	return (
		<hr
			className="border border-blueMain w-screen"
		/>
	);
}
