const helpers = require('../helpers')
const TYPES = ['component', 'page', 'screen', 'style']

module.exports = {} = async function generateComponent({
  parameters,
  generate,
  info,
  config
}) {
  const { type, name } = helpers.getNameType(parameters)

  if (TYPES.some(t => type === t)) {
    const styledPath = helpers.getStyledPath(config, parameters)
    if (
      (config.useStyledComponents &&
        parameters.options['noStyled'] === undefined) ||
      parameters.options['noStyled'] === false
    ) {
      await generate({
        template: 'styled.js.ejs',
        target: styledPath,
        props: { name }
      })
      info(`Generated file at ${styledPath}`)
      helpers.runHook(config, parameters, styledPath)
    }
  }
}
