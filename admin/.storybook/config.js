import { configure, addDecorator } from '@storybook/vue'
import '../src/assets/css/main.css'

let decoratorVueTemplate = () => {
  return {
    template: `
    <div class="container pt-6">
      <link
        rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.1.0/css/line-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&display=swap"
      />
      <story/>
    </div>`
  }
}
addDecorator(decoratorVueTemplate)

configure(require.context('./stories', true, /\.stories\.js$/), module)
// automatically import all files ending in *.stories.js
