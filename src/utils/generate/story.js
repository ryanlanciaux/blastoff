const helpers = require('../helpers')
const TYPES = ['component', 'page', 'screen', 'story']

module.exports = {} = async function generateComponent({
  parameters,
  generate,
  info,
  config
}) {
  const { type, name } = helpers.getNameType(parameters)

  if (TYPES.some(t => type === t)) {
    const storyPath = helpers.getStoryPath(config, parameters)
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
      helpers.runHook(config, parameters, storyPath)
    }
  }
}
