import { RBLogo, RedirectButton, SocialMediaMenu } from "@/components";
import React from "react";

const Home: React.FC = () => {
	return (
		<div
			className="flex flex-col items-center justify-center
			p-4 gap-4"
		>
			<RBLogo />

			<Paragraph
				text="Olá! Seja bem-vindo à primeira versão do meu site. Aguarde para maiores novidades."
			/>

			<Paragraph
				text="Enquanto isso, clique no link abaixo. Julgo ser bastante interessante nesse primeiro momento:"
			/>

			<RedirectButton
				redirectLink="https://youtu.be/tgIRmwMvlf4"
				callText="Clique aqui :)"
			/>

			<SocialMediaMenu />

		</div>
	);
}

export default Home;

type ParagraphTypes = {
	text: string;
};

const Paragraph = ({ text }: ParagraphTypes) => {
	return (
		<p
			className="text-center text-lg"
		>
			{text}
		</p>
	);
}
