# blastoff CLI 

A basic CLI for generating components / pages.

## Installation

`npm install -g @blastoff/blastoff`

## Commands

`blastoff g {component|page|screen} Name` (e.g. `blastoff g component Button`)

This will create a component / page / screen along with a storybook story, test, and index file. The test is assuming that you have react-testing-library installed

## Options

- `--path` - the path where the parent folder should be created defaults to `/src/components/`, `src/pages/`, or `/src/screens/`
- `--noStory` - skip creating a story
- `--noTest` - skip creating a test
