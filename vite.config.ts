import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: '/src/lib.js',
      name: 'EmChat',
      fileName: (format) => `em-chat.${format}.js`
    }
  },
  plugins: [vue({
    customElement: true
//    template: {
//      compilerOptions: {
//        isCustomeElement: (tag) => tag.includes('-')
//      }
//    }
  })]
})
