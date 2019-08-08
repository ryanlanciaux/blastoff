const generateModule = require('../utils/generate/module')
const generateComponent = require('../utils/generate/component')

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

    const generators = [generateModule, generateComponent]

    generators.forEach(generator =>
      generator({ parameters, generate, info, config })
    )
  }
}
