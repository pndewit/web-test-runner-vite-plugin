import * as vite from 'vite';

/**
 * Checks whether the url is a virtual file server by @web/test-runner.
 * @param {String} url
 */
function isTestRunnerFile(url) {
  return url.startsWith('/__web-dev-server') || url.startsWith('/__web-test-runner');
}

/**
 * Minimal Vite plugin to ignore (pass through) virtual @web/test-runner files.
 * @returns {import('vite').Plugin}
 */
function ignoreTestRunnerFiles() {
  return {
    name: 'vite-ignore-wtr-files-plugin',
    resolveId: id => isTestRunnerFile(id) ? { id, external: true } : undefined,
  };
}

/** @returns {import('@web/test-runner-core').TestRunnerPlugin} */
export function vitePlugin() {
  /** @type {import('vite').ViteDevServer} */
  let server;

  return {
    name: 'vite-plugin',
    async serverStart() {
      server = await vite.createServer({
        clearScreen: false,
        configFile: false,
        logLevel: 'info',
        mode: 'development',
        plugins: [ignoreTestRunnerFiles()],
      });

      console.log('[vite] starting server...');

      await server.listen();

      server.printUrls();
    },
    serverStop() {
      return server.close();
    },
    async serve({ request }) {
      if (isTestRunnerFile(request.url)) return;

      try {
        const result = await server.transformRequest(request.path, {ssr: false});
        return {body: result.code};
      } catch (error) {
        console.error('serve: couldn\'t transform the request', error);
      }
    },
  };
}
