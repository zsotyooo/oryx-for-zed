'use strict';

const fs = require('fs');
const path = require('path');
const sable = require('sable');
const argv = require('yargs').argv;

const isVerbose = !!argv.verbose;

const rootDir = process.cwd();
const sourcePath = './assets/Zed/';
const publicPath = '/assets/';
const sourceDir = path.resolve(sourcePath);
const publicDir = path.resolve(path.join('public/Zed', publicPath));

let bundlesPath = './vendor/spryker/';
let guiFolder = 'gui';

if (!fs.existsSync(path.resolve(bundlesPath, guiFolder))) {
    sable.log.step('spryker core: no-bundle-split layout detected');

    bundlesPath = './vendor/spryker/spryker/Bundles/';
    guiFolder = 'Gui';
}

const bundlesDir = path.resolve(bundlesPath);
const guiPath = path.join(bundlesPath, guiFolder);

const settings = {
    options: {
        isProduction: !!argv.prod,
        isWatching: !!argv.dev,
        isVerbose
    },

    paths: {
        guiFolder,
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
        patterns: ['**/Zed/**/*.entry.js'],
        description: 'looking for entry points...',
        defineName: p => path.basename(p, '.entry.js')
    },

    resolveModules: {
        dirs: [path.resolve('./vendor/spryker')],
        patterns: ['**/Zed/node_modules'],
        description: 'resolving core modules deps...'
    }
}

module.exports = settings;
