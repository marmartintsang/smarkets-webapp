# Smarkets Web App

[![GitHub Actions status](https://raw.githubusercontent.com/marmartintsang/smarkets-webapp/develop/docs/images/badge.svg)](https://github.com/marmartintsang/smarkets-webapp/actions)

---

## Getting Started

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Environment setup

First you need to install [node](https://nodejs.org/en/). Make sure the node version is 10.13 or above. ([nvm](https://github.com/creationix/nvm) is recommended to manage node version for Mac OSX)

```bash
$ node -v
v10.13.0
```

[Yarn](https://github.com/yarnpkg/yarn) is recommend to use for managing npm dependencies.

```bash
# install yarn globally
$ npm i yarn -g
# confirm yarn version
$ yarn -v
```

Install dependencies

```bash
$ yarn

yarn install v1.21.1
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.71s.
```

## Startup project

> To bypass Cross-origin resource sharing(CORS) mechanisms we encourage you to use: [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/)

1. Navigate to [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/)

2. Click `Request temporary access to the demo server` button

3. Startup project

```bash
$ yarn start
```

---

### Unit Test

[Jest](https://jestjs.io/) is used for unit testing. There are 3 test cases to test:

- Tests UI render for main screen
- Tests price to decimal odds convertion
- Tests quantity to back stake convertion

Start unit test

```bash
$ yarn run test
```

---

## Continuous Integration (CI)

Continuous Integration (CI) is implemented by [GitHub Actions](https://github.com/marmartintsang/martian-robots/actions) in this project. Unit tests will be run automatically if pushing to `main` branch. The configuration file can be found in `.github/workflows/ci.yml`

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
