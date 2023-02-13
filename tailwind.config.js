/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			blueMain: '#000ca6',
			blueMedium: '#037d93',
			blueHigh: '#000920',
			white: '#ffffff',
			black: '#000000',
		},
		fontFamily: {
			'sans': '"Ubuntu", sans-serif',
		},
	},
	plugins: [],
}
