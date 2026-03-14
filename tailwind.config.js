import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
darkMode: ["class"],
content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
	extend: {
	colors: {
		// Restaurant customer theme
		restaurant: {
		primary: 'var(--restaurant-primary)',
		dark: 'var(--restaurant-dark)',
		accent: 'var(--restaurant-accent)',
		card: 'var(--restaurant-card)',
		'text-light': 'var(--restaurant-text-light)',
		},
		// Staff theme
		staff: {
		bg: 'var(--staff-bg)',
		surface: 'var(--staff-surface)',
		border: 'var(--staff-border)',
		text: 'var(--staff-text)',
		pending: 'var(--staff-pending)',
		active: 'var(--staff-active)',
		completed: 'var(--staff-completed)',
		cancelled: 'var(--staff-cancelled)',
		},
		// shadcn colors
		border: "hsl(var(--border))",
		input: "hsl(var(--input))",
		ring: "hsl(var(--ring))",
		background: "hsl(var(--background))",
		foreground: "hsl(var(--foreground))",
		primary: {
		DEFAULT: "hsl(var(--primary))",
		foreground: "hsl(var(--primary-foreground))",
		},
		secondary: {
		DEFAULT: "hsl(var(--secondary))",
		foreground: "hsl(var(--secondary-foreground))",
		},
		destructive: {
		DEFAULT: "hsl(var(--destructive))",
		foreground: "hsl(var(--destructive-foreground))",
		},
		muted: {
		DEFAULT: "hsl(var(--muted))",
		foreground: "hsl(var(--muted-foreground))",
		},
		accent: {
		DEFAULT: "hsl(var(--accent))",
		foreground: "hsl(var(--accent-foreground))",
		},
		popover: {
		DEFAULT: "hsl(var(--popover))",
		foreground: "hsl(var(--popover-foreground))",
		},
		card: {
		DEFAULT: "hsl(var(--card))",
		foreground: "hsl(var(--card-foreground))",
		},
	},
	fontFamily: {
		display: ['Playfair Display', 'serif'],
		body: ['DM Sans', 'sans-serif'],
		mono: ['DM Mono', 'monospace'],
	},
	borderRadius: {
		lg: "var(--radius)",
		md: "calc(var(--radius) - 2px)",
		sm: "calc(var(--radius) - 4px)",
	},
	},
},
plugins: [tailwindcssAnimate],
}