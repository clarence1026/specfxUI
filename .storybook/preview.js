import { ThemeProvider } from '../src/styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <div style={{ margin: '2rem' }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]; 