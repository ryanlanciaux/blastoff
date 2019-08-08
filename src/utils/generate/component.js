const baseValidators = require('../validators')

module.exports = {} = async function generateComponent({
  parameters,
  generate,
  info,
  config
}) {
  const { second: name, first: type } = parameters

  // this is pretty junky for now - we should use yup or something here
  // (yes so bad, in fact, that I copy and pasted the comment along with the code)
  const validators = [
    baseValidators.nameValidator,
    baseValidators.typeValidator
  ]

  validators.forEach(validate => validate({ name, type }))

  // pages and components use the same structure
  if (type === 'component' || type === 'page' || type === 'screen') {
    function getTypePath(type) {
      const upperType = type.replace(/^\w/, c => c.toUpperCase())
      return config[`default${upperType}Path`] || `src/${type}s`
    }

    const extension = config.useTypeScript ? 'ts' : 'js'
    const componentExtension = config.useTypeScript ? 'tsx' : 'js'

    const defaultPath =
      parameters.options && parameters.options.path
        ? parameters.options.path
        : getTypePath(type)

    // Setup path getters
    const defaultGetComponentPath = (path, name, extension, parameters) =>
      `${path}/${name}/${name}.${extension}`
    const defaultGetIndexPath = (path, name, extension, parameters) =>
      `${path}/${name}/index.${extension}`
    const defaultGetStoryPath = (path, name, extension, parameters) =>
      `${path}/${name}/${name}.stories.${extension}`
    const defaultGetTestPath = (path, name, extension, parameters) =>
      `${path}/${name}/${name}.test.${extension}`
    const defaultGetStyledPath = (path, name, extension, parameters) =>
      `${path}/${name}/${name}.styles.${extension}`

    const componentPath = (config.getComponentPath || defaultGetComponentPath)(
      defaultPath,
      name,
      componentExtension,
      parameters
    )
    const indexPath = (config.getIndexPath || defaultGetIndexPath)(
      defaultPath,
      name,
      extension,
      parameters
    )

    const storyPath = (config.getStoryPath || defaultGetStoryPath)(
      defaultPath,
      name,
      componentExtension,
      parameters
    )

    const styledPath = (config.getStyledPath || defaultGetStyledPath)(
      defaultPath,
      name,
      componentExtension,
      parameters
    )

    const testPath = (config.getTestPath || defaultGetTestPath)(
      defaultPath,
      name,
      componentExtension,
      parameters
    )

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

    if (
      config.useStorybook !== false &&
      (parameters.options['noStory'] === undefined ||
        parameters.options['noStory'] === false)
    ) {
      await generate({
        template: 'story.js.ejs',
        target: storyPath,
        props: { name }
      })
      info(`Generated file at ${storyPath}`)
    }

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
    }
  }
}
