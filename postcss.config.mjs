import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default () => ({
  plugins: {
    'postcss-import': {
      path: path.resolve('src/assets/styles')
    },
    'postcss-mixins': {
      mixinsDir: path.resolve('src/assets/styles')
    },
    'postcss-extend': {}, // plugin for Sass-like variables
    'postcss-simple-vars': {}, // plugin for Sass-like variables
    'postcss-nested': {}, // plugin to unwrap nested rules like how Sass does it
    'postcss-color-function': {}, // plugin to transform CSS color function from editor draft of 'Color Module Level 4' specification to more compatible CSS.
    autoprefixer: {
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    }
  }
})
