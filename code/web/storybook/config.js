// Imports
import { configure } from '@storybook/react'

// React Storybook uses this config.js file as the entry point. This is the file loaded by webpack when it's initializing.

function loadStories() {
  require('./stories/common.js'),
    require('./stories/buttons.js'),
    require('./stories/typography.js'),
    require('./stories/icons.js'),
    require('./stories/input.js'),
    require('./stories/modal.js'),
    require('./stories/card.js'),
    require('./stories/grid.js')
}

configure(loadStories, module)
