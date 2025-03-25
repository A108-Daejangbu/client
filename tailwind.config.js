/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			black: '#000000',
  			purple: '#7953FF',
  			blue: '#3E6FFA',
  			main200: '#1E1E1E',
  			main100: '#242C6C',
  			gray200: '#BFBFBF',
  			gray100: '#D2D2D2',
        gray300: '#D9D9D9',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'pre-black': [
  				'Pretendard-Black',
  				'sans-serif'
  			],
  			'pre-extrabold': [
  				'Pretendard-ExtraBold',
  				'sans-serif'
  			],
  			'pre-bold': [
  				'Pretendard-Bold',
  				'sans-serif'
  			],
  			'pre-semibold': [
  				'Pretendard-SemiBold',
  				'sans-serif'
  			],
  			'pre-light': [
  				'Pretendard-Light',
  				'sans-serif'
  			],
  			'pre-regular': [
  				'Pretendard-Regular',
  				'sans-serif'
  			],
  			'pre-medium': [
  				'Pretendard-Medium',
  				'sans-serif'
  			],
  			'pre-thin': [
  				'Pretendard-Thin',
  				'sans-serif'
  			],
  			'pre-extralight': [
  				'Pretendard-ExtraLight',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'8': '8px',
  			'10': '10px',
  			'12': '12px',
  			'14': '14px',
  			'16': '16px',
  			'20': '20px',
  			'24': '24px'
  		},
  		borderWidth: {
  			'0.2': '0.2px',
  			'0.5': '0.5px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
