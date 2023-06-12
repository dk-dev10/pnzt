/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue"
import { join } from "path"
import { defineConfig } from "vite"
import viteCompression from 'vite-plugin-compression'
import VueTypeImports from '@rah-emil/vite-plugin-vue-type-imports'

export default defineConfig({
  plugins: [
		vue({}),
		viteCompression(),
		VueTypeImports(),
],
  resolve: {
		alias: [
			{
				// для алиасов в секции style
				find: /~(.+)/,
				replacement: join(__dirname, "src/$1"),
			},
			{
				find: /@\//,
				replacement: join(__dirname, "src") + "/",
			},
			{
				find: "vue",
				replacement: "vue/dist/vue.esm-bundler.js",
			}
		],
  },
	build: {
		cssCodeSplit: true,
		sourcemap: true,
		rollupOptions: {
			output:{
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString()
					}
					if (id.includes('assets')) {
						return id.toString().split('assets/')[1].split('/')[0].toString()
					}
				}
			}
		}
	},
	test: {
		environment: 'happy-dom',
		globals:true,
		coverage: {
			provider: 'istanbul'
		},
	}
})
