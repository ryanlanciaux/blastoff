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

    const path =
      parameters.options && parameters.options.path
        ? parameters.options.path
        : 'src/components'

    if (type === 'component') {
      await generate({
        template: 'component.js.ejs',
        target: `${path}/${name}/${name}.js`,
        props: { name }
      })
      info(`Generated file at ${path}/${name}/${name}.js`)

      await generate({
        template: 'test.js.ejs',
        target: `${path}/${name}/${name}.test.js`,
        props: { name }
      })
      info(`Generated file at ${path}/${name}/${name}.test.js`)

      await generate({
        template: 'index.js.ejs',
        target: `${path}/components/${name}/index.js`,
        props: { name }
      })
      info(`Generated file at ${path}/components/${name}/index.js`)

      await generate({
        template: 'story.js.ejs',
        target: `${path}/components/${name}/${name}.stories.js`,
        props: { name }
      })
      info(`Generated file at ${path}/components/${name}/${name}.stories.js`)
    }
  }
}
