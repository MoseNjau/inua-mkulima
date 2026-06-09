import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:    '#E8B40A',
          green:   '#009438',
          ink:     '#272935',
          muted:   '#707070',
          border:  '#DDDDDD',
          surface: '#FCFCFC',
          cream:   '#F5F5DC',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        futura:  ['Futura', 'Trebuchet MS', 'sans-serif'],
      },
      fontSize: {
        hero:   ['37px', { lineHeight: '46px', fontWeight: '700' }],
        title:  ['16px', { lineHeight: '25px', fontWeight: '600' }],
        body:   ['20px', { lineHeight: '30px', fontWeight: '500' }],
        label:  ['13px', { lineHeight: '20px', fontWeight: '600' }],
        small:  ['11px', { lineHeight: '17px', fontWeight: '600' }],
        btn:    ['15px', { lineHeight: '23px', fontWeight: '700' }],
      },
      boxShadow: {
        card:  '0 4px 24px rgba(0, 0, 0, 0.16)',
        panel: '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-farmer': "url('/images/bg.png')",
      },
    },
  },
  plugins: [],
}

export default config
