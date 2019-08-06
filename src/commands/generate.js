module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info }
    } = toolbox

    const type = parameters.first
    const name = parameters.second

    // pages and components use the same structure
    if (type === 'component' || type === 'page' || type === 'screen') {
      const path =
        parameters.options && parameters.options.path
          ? parameters.options.path
          : `src/${type}s`

      await generate({
        template: 'component.js.ejs',
        target: `${path}/${name}/${name}.js`,
        props: { name }
      })
      info(`Generated file at ${path}/${name}/${name}.js`)

      await generate({
        template: 'index.js.ejs',
        target: `${path}/${name}/index.js`,
        props: { name }
      })
      info(`Generated file at ${path}/${name}/index.js`)

      if (
        parameters.options['noTest'] === undefined ||
        parameters.options['noTest'] === false
      ) {
        await generate({
          template: 'test.js.ejs',
          target: `${path}/${name}/${name}.test.js`,
          props: { name }
        })
        info(`Generated file at ${path}/${name}/${name}.test.js`)
      }

      if (
        parameters.options['noStory'] === undefined ||
        parameters.options['noStory'] === false
      ) {
        await generate({
          template: 'story.js.ejs',
          target: `${path}/${name}/${name}.stories.js`,
          props: { name }
        })
        info(`Generated file at ${path}/${name}/${name}.stories.js`)
      }
    }
  }
}
