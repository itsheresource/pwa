## Before you start

1. Ensure you have git version 2.9.0 or higher
   `git --version`
2. Run the following in terminal:
   `git config core.hooksPath .githooks`

This procedure ensures the entire team is using the same git hooks which are:

- Run ESLint before committing
- Run tests before pushing

## Setup procedure

Create your environment variables.
In development, create a `.env.development.local` file.
In production, create a `.env.<to-be-decided>` file.

Fill out the files with the following variables:

```
REACT_APP_GOOGLE_MAP_API_KEY=<ask-admin-for-key>
REACT_APP_BACKEND_URL=http://driverapi.delgate.com/api
REACT_APP_BACKEND_URL_2=http://cusapi.delgate.com/api
REACT_APP_DRIVER_TRACKING_API=http://drivertrackingapi.delgate.com
REACT_APP_IMAGE_URL=http://driverapi.delgate.com/upload
REACT_APP_DRIVER_API_BACKEND_URL_BASE=http://driverapi.delgate.com/
REACT_APP_CUSTOMER_API_BACKEND_URL_BASE=http://cusapi.delgate.com/
REACT_APP_ROUTE_PLANNER_API=http://routeplannerapi.delgate.com/api
REACT_APP_REALEX_PAYMENTS_URL=https://pay.sandbox.realexpayments.com/pay ## For Development
REACT_APP_REALEX_PAYMENTS_URL=https://pay.realexpayments.com/pay ## For Production
```

### For Developer and QA Environments Only (NOT FOR PRODUCTION)

Add the following environment variable to debug performance issues on redux. This will give us a large data set and just calculate the average times of each redux action.

```
REACT_APP_DEBUG_PERFORMANCE=true
```

Note that all env variables must have `REACT_APP_` in front of it for `create-react-app` to recognize it.

### Running on localhost using HTTPS

As many services are using HTTPS, try to always develop in HTTPS mode. See the [README file](./.cert/README.md) in `.cert/` for more info.

If you get a `ws` error in console when starting, this is due to sockets requiring `wss`, but the development webpack in `react-scripts` is using `ws`. You can fix this in two ways:

1. Update `react-scripts` to anything >= 3.3.1. This is the preferred method, but as of this writing, the live deployed build would have a problem when this script was updated. Hence, the second method is proposed. However, the build issue may have been fixed in BWPUU-768, but we have not tested yet. See [here](https://github.com/facebook/create-react-app/issues/8075) and [here](https://github.com/facebook/create-react-app/pull/8079) for more info.
2. Go into `node_modules/react-dev-utils/webpackHotDevClient.js`, and change line 62 (or look for `var connection = new WebSocket(...)`) from `protocol: 'ws'` to `protocol: window.location.protocol === 'https:' ? 'wss' : 'ws'`.

## Standards

- For the sake of consistency, only use `npm`.
- Do not push any changes to vscode settings files so that all developers are working in the same environment, with the same linters and prettiers, etc.
- If you think there is a better setting, please bring it up to the team in a meeting so that everyone can vote on the new settings.
- Tailwind should only be used when there is no complex styling and the style is not repeated multiple times in one component.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
