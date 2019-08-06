# blastoff CLI

A basic CLI for generating components / pages.

## Commands

`blastoff g {component|page|screen}`

This will create a component / page / screen along with a storybook story, test, and index file. The test is assuming that you have react-testing-library installed

## Options

- `--path` - the path where the parent folder should be created defaults to `/src/components/`, `src/pages/`, or `/src/screens/`
- `--noStory` - skip creating a story
- `--noTest` - skip creating a test

## Configuration

You can add `blastoff.config.js` to the root of your project for additional customization options such as functions for building the paths (advanced) as well as whether or not to use TypeScript file extensions.

- `useTypeScript` - add ts / tsx extensions to the generated files
- `getComponentPath` - A function that receives path, name, extension, parameters and returns the path where the `component` file should be created
- `getIndexPath` - A function that receives path, name, extension, parameters and returns the path where the `index` file should be created
- `getStoryPath` - A function that receives path, name, extension, parameters and returns the path where the `story` file should be created
- `getTestPath` - A function that receives path, name, extension, parameters and returns the path where the `test` file should be created

All of the functions have a signature like the following:

```
  (path: string, name: string, extension: string, parameters: { [name: string]: any }) => string
```

[Refer to the Gluegun docs for more on Parameters](https://infinitered.github.io/gluegun/)

```js
module.exports = {
  useTypeScript: true,
  getStoryPath: (path, name, extension, parameters) => {
    return `one/${path}/${name}/${name}.stories.${extension}`
  },
  getTestPath: (path, name, extension, parameters) => {
    return `two/${path}/${name}/${name}.test.${extension}`
  },
  getComponentPath: (path, name, extension, parameters) => {
    return `three/${path}/${name}/${name}.${extension}`
  },
  getIndexPath: (path, name, extension, parameters) => {
    return `four/${path}/${name}/index.${extension}`
  }
}
```
