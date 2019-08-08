const helpers = require('../helpers')
const baseValidators = require('../validators')

module.exports = {} = async function generateModule({
  parameters,
  generate,
  info,
  config
}) {
  const { second: name, first: type } = parameters

  // this is pretty junky for now - we should use yup or something here
  const validators = [
    baseValidators.nameValidator,
    baseValidators.typeValidator
  ]

  validators.forEach(validate => validate({ name, type }))

  if (type === 'module') {
    let namespace = config.namespace
    let localName = name.toLowerCase()

    if (name.indexOf('/') > -1) {
      ;[namespace, localName] = name.split('/')
    }

    const fullName =
      namespace !== undefined ? `${namespace}/${localName}` : localName

    // Get path 1) From flag if available 2) From config 3) Fallback to using just name
    const modulePath =
      parameters.options && parameters.options.path
        ? `${parameters.options.path}/${localName}`
        : config.modulePath !== undefined
        ? `${config.modulePath}/${localName}`
        : localName

    await generate({
      template: 'modules/package.json.ejs',
      target: `${modulePath}/package.json`,
      props: { name: localName, fullName }
    })

    await generate({
      template: 'modules/.babelrc.ejs',
      target: `${modulePath}/.babelrc`,
      props: { name: localName, fullName }
    })

    await generate({
      template: 'modules/index.js.ejs',
      target: `${modulePath}/src/index.js`,
      props: { name: localName, fullName }
    })

    info(`Created module at ${modulePath}`)
    helpers.runHook(config, parameters, modulePath)
  }
}
