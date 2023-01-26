// .storybook/main.js|mjs|ts

import { mergeConfig } from 'vite';
export default {
  stories: ['..src/stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-addon-designs'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-addon-designs']
      }
    });
  },
  docs: {
    autodocs: true
  }
};