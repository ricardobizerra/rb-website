import { GithubLogo, LinkedinLogo, MailLogo, TabnewsLogo } from "@/assets";
import { NextApiRequest, NextApiResponse } from "next";

type SocialMediaType = {
	imageSrc: any;
	imageAlt: string;
	color: string;
	redirectLink: string;
};

const SocialMediaList: SocialMediaType[] = [
	{
		imageSrc: LinkedinLogo,
		imageAlt: "LinkedIn Logo",
		color: "#0085ff",
		redirectLink: "https://linkedin.com/in/ricardobizerra"
	},
	{
		imageSrc: GithubLogo,
		imageAlt: "GitHub Logo",
		color: "#171515",
		redirectLink: "https://github.com/ricardobizerra"
	},
	{
		imageSrc: MailLogo,
		imageAlt: "Mail Logo",
		color: "#ff0000",
		redirectLink: "mailto:ricardo.bizerra19@gmail.com"
	},
	{
		imageSrc: TabnewsLogo,
		imageAlt: "TabNews Logo",
		color: "#171515",
		redirectLink: "https://tabnews.com.br/ricardobizerra"
	}
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		res.status(200).json(SocialMediaList);
	}
}
