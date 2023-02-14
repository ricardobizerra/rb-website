type RedirectButtonType = {
	redirectLink: string;
	callText: string;
}

export default function RedirectButton({ redirectLink, callText }: RedirectButtonType) {
	return (
		<a
			href={redirectLink}
			target="_blank"
			rel="noopener noreferrer"
			className="bg-blueMedium text-white text-lg px-2 py-1 rounded-[5px] ease-linear duration-300
			hover:bg-blueHigh"
		>
			{callText}
		</a>
	)
}
