import { configure, addDecorator } from '@storybook/vue'
import '../src/assets/css/main.css'

let decoratorVueTemplate = () => {
  return {
    template: `<div class="container pt-6"><story/></div>`
  }
}
addDecorator(decoratorVueTemplate)

configure(require.context('./stories', true, /\.stories\.js$/), module)
// automatically import all files ending in *.stories.js
