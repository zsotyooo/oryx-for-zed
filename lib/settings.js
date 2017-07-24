const fs = require('fs');
const path = require('path');
const oryx = require('@spryker/oryx');
const argv = require('yargs').argv;

const isVerbose = !!argv.verbose;

const rootDir = process.cwd();
const sourcePath = './assets/Zed/';
const publicPath = '/assets/';
const sourceDir = path.resolve(sourcePath);
const publicDir = path.resolve(path.join('public/Zed', publicPath));

let bundlesPath = './vendor/spryker/';
let guiFolder = 'gui';
let guiComponentCollectionFolder = 'gui-component-collection';

if (!fs.existsSync(path.resolve(bundlesPath, guiFolder))) {
    oryx.log.step('spryker core: no-bundle-split layout detected');

    bundlesPath = './vendor/spryker/spryker/Bundles/';
    guiFolder = 'Gui';
    guiComponentCollectionFolder = 'GuiComponentCollection';
}

const bundlesDir = path.resolve(bundlesPath);
const guiPath = path.join(bundlesPath, guiFolder);

const settings = {
    options: {
        isProduction: !!argv.prod,
        isWatching: !!argv.dev,
        isVerbose,

        // experimental
        isBoost: !!argv.boost
    },

    paths: {
        guiFolder,
        guiComponentCollectionFolder,
        sourcePath,
        publicPath,
        bundlesPath,
        guiPath,
        rootDir,
        sourceDir,
        publicDir,
        bundlesDir
    },

    entry: {
        dirs: [path.resolve('./vendor/spryker')],
        patterns: ['**/Zed/**/*.entry.js', '**/Zed/**/*.entry.ts'],
        description: 'looking for entry points...',
        defineName: (p) => path.basename(p.substring(0, p.length - 3), '.entry')
    },

    resolveModules: {
        dirs: [path.resolve('./vendor/spryker')],
        patterns: ['**/Zed/node_modules'],
        description: 'resolving core modules deps...'
    }
}

module.exports = settings;
