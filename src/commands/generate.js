const generateModule = require('../utils/generate/module')
const generateComponent = require('../utils/generate/component')
const generateStory = require('../utils/generate/story')
const generateTest = require('../utils/generate/test')
const generateStyle = require('../utils/generate/style')

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info },
      config
    } = toolbox

    const generators = [
      generateModule,
      generateComponent,
      generateStory,
      generateTest,
      generateStyle
    ]

    generators.forEach(generator =>
      generator({ parameters, generate, info, config })
    )
  }
}
