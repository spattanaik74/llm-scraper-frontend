/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			boxShadow: {
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.7)',
			  }
		}
	},

	plugins: []
};

module.exports = config;
