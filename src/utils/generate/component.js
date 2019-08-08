const helpers = require('../helpers')
const TYPES = ['component', 'page', 'screen']

module.exports = {} = async function generateComponent({
  parameters,
  generate,
  info,
  config
}) {
  const { type, name } = helpers.getNameType(parameters)

  if (TYPES.some(t => type === t)) {
    const componentPath = helpers.getComponentPath(config, parameters)
    const indexPath = helpers.getIndexPath(config, parameters)

    await generate({
      template: 'component.js.ejs',
      target: componentPath,
      props: { name }
    })
    info(`Generated file at ${componentPath}`)

    await generate({
      template: 'index.js.ejs',
      target: indexPath,
      props: { name }
    })
    info(`Generated file at ${indexPath}`)
    helpers.runHook(config, parameters, componentPath)
  }
}
