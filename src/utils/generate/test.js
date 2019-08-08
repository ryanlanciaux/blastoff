const helpers = require('../helpers')
const TYPES = ['component', 'page', 'screen', 'test']

module.exports = {} = async function generateComponent({
  parameters,
  generate,
  info,
  config
}) {
  const { type, name } = helpers.getNameType(parameters)

  if (TYPES.some(t => type === t)) {
    const testPath = helpers.getTestPath(config, parameters)
    if (
      parameters.options['noTest'] === undefined ||
      parameters.options['noTest'] === false
    ) {
      await generate({
        template: 'test.js.ejs',
        target: testPath,
        props: { name }
      })
      info(`Generated file at ${testPath}`)
    }
  }
}
