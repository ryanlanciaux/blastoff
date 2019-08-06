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

    if (type === 'component') {
      await generate({
        template: 'component.js.ejs',
        target: `src/components/${name}/${name}.js`,
        props: { name }
      })
      info(`Generated file at components/${name}/${name}.js`)

      await generate({
        template: 'index.js.ejs',
        target: `src/components/${name}/index.js`,
        props: { name }
      })
      info(`Generated file at components/${name}/index.js`)

      await generate({
        template: 'story.js.ejs',
        target: `src/components/${name}/${name}.stories.js`,
        props: { name }
      })
      info(`Generated file at components/${name}/${name}.stories.js`)
    }
  }
}
