const baseValidators = require('./validators')

const defaultGetComponentPath = ({ path, name, componentExtension }) =>
  `${path}/${name}/${name}.${componentExtension}`
const defaultGetIndexPath = ({ path, name, extension }) =>
  `${path}/${name}/index.${extension}`
const defaultGetStoryPath = ({ path, name, componentExtension }) =>
  `${path}/${name}/${name}.stories.${componentExtension}`
const defaultGetTestPath = ({ path, name, componentExtension }) =>
  `${path}/${name}/${name}.test.${componentExtension}`
const defaultGetStyledPath = ({ path, name, componentExtension }) =>
  `${path}/${name}/${name}.styles.${componentExtension}`

module.exports.getNameType = function getNameType(parameters) {
  const { second: name, first: type } = parameters

  const validators = [
    baseValidators.nameValidator,
    baseValidators.typeValidator
  ]

  validators.forEach(validate => validate({ name, type }))

  return { name, type }
}

function getCapitalized(word) {
  return word.replace(/^\w/, c => c.toUpperCase())
}

module.exports.getTypePath = function getTypePath(type, config) {
  const upperType = getCapitalized(type)
  return config[`default${upperType}Path`] || `src/${type}s`
}

module.exports.getExtension = function getExtension(config) {
  return config.useTypeScript ? 'ts' : 'js'
}

module.exports.getComponentExtension = function getComponentExtension(config) {
  return config.useTypeScript ? 'tsx' : 'js'
}

module.exports.getDefaultPath = function getDefaultPath(parameters, config) {
  const { type } = module.exports.getNameType(parameters)
  return parameters.options && parameters.options.path
    ? parameters.options.path
    : module.exports.getTypePath(type, config)
}

function getPath(config, parameters, pathResolver) {
  const { name } = module.exports.getNameType(parameters)
  const path = module.exports.getDefaultPath(parameters, config)
  const extension = module.exports.getExtension(config)
  const componentExtension = module.exports.getComponentExtension(config)

  return pathResolver({
    path,
    name,
    extension,
    componentExtension,
    parameters
  })
}

module.exports.getComponentPath = function getComponentPath(
  config,
  parameters
) {
  return getPath(
    config,
    parameters,
    config.getComponentPath || defaultGetComponentPath
  )
}

module.exports.getIndexPath = function getIndexPath(config, parameters) {
  return getPath(config, parameters, config.getIndexPath || defaultGetIndexPath)
}

module.exports.getStoryPath = function getStoryPath(config, parameters) {
  return getPath(config, parameters, config.getStoryPath || defaultGetStoryPath)
}

module.exports.getStyledPath = function getStoryPath(config, parameters) {
  return getPath(
    config,
    parameters,
    config.getStyledPath || defaultGetStyledPath
  )
}

module.exports.getTestPath = function getTestPath(config, parameters) {
  return getPath(config, parameters, config.getTestPath || defaultGetTestPath)
}

module.exports.runHook = function runHook(config, parameters, path) {
  const { name, type } = module.exports.getNameType(parameters)
  const upperType = getCapitalized(type)

  if (config[`after${upperType}`]) {
    config[`after${upperType}`]({ name, type, path, parameters })
  }
}
