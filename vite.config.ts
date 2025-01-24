import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // Включает глобальные функции, такие как expect, describe
    environment: "jsdom",  // Использование JSDOM для имитации браузерного окружения
    setupFiles: "./setupTests.ts",  // Подключение файлов установки
  },
})
