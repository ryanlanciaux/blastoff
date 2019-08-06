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

    const extension = config.useTypeScript ? 'ts' : 'js'
    const componentExtension = config.useTypeScript ? 'tsx' : 'js'

    const type = parameters.first
    const name = parameters.second

    // pages and components use the same structure
    if (type === 'component' || type === 'page' || type === 'screen') {
      const defaultPath =
        parameters.options && parameters.options.path
          ? parameters.options.path
          : `src/${type}s`

      // Setup path getters
      const defaultGetComponentPath = (path, name, extension, parameters) =>
        `${path}/${name}/${name}.${extension}`
      const defaultGetIndexPath = (path, name, extension, parameters) =>
        `${path}/${name}/index.${extension}`
      const defaultGetStoryPath = (path, name, extension, parameters) =>
        `${path}/${name}/${name}.stories.${extension}`
      const defaultGetTestPath = (path, name, extension, parameters) =>
        `${path}/${name}/${name}.test.${extension}`

      const componentPath = (config.getComponentPath ||
        defaultGetComponentPath)(
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
        parameters.options['noStory'] === undefined ||
        parameters.options['noStory'] === false
      ) {
        await generate({
          template: 'story.js.ejs',
          target: storyPath,
          props: { name }
        })
        info(`Generated file at ${storyPath}`)
      }
    }
  }
}
