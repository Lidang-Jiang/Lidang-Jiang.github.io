import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/utils/project-*.ts',
        'src/composables/useDisclosure.ts',
        'src/composables/useScrollReveal.ts',
      ],
      exclude: ['**/*.test.ts'],
      reporter: ['text', 'json-summary', 'html'],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
}))
