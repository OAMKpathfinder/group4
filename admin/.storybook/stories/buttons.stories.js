import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import '../../src/assets/css/main.css'

import Button from './Components/Button.vue'

storiesOf('Buttons', module)
  .add('Primary', () => ({
    components: { Button },
    template: `
    <Button
      @click="action"
      :disabled="false"
      :variant="'primary'"
    >
      Press Me!
    </Button>
  `,
    methods: { action: action('Clicked') }
  }))
  .add('Danger', () => ({
    components: { Button },
    template: `
    <Button
      @click="action"
      :disabled="false"
      :variant="'red'"
    >
      Danger!
    </Button>
  `,
    methods: { action: action('clicked') }
  }))
  .add('Light', () => ({
    components: { Button },
    template: `
    <Button
      @click="action"
      :disabled="false"
      :variant="'light'"
    >
      Light me!
    </Button>
  `,
    methods: { action: action('clicked') }
  }))
