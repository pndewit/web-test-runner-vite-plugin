# web-test-runner-vite-plugin

An [`@web/test-runner`](https://github.com/modernweb-dev/web/tree/master/packages/test-runner) plugin to test Vite-powered projects.


## Installation

```shell
npm i web-test-runner-vite-plugin
```

## Usage

Add the plugin to your `web-test-runner.config.js`:

```js
import { vitePlugin } from 'web-test-runner-vite-plugin';

export default /** @type {import('@web/test-runner')}.TestRunnerConfig} */ ({
  files: [],
  plugins: [vitePlugin()],
});
```
