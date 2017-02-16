# oryx for Zed

Spryker ZED frontend automation tool (oryx based)

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Setup](#setup)
4. [Usage](#usage)
5. [API](#api)

> For more info about **oryx**, [click here](https://github.com/spryker/oryx).

## Introduction

This is an extension of oryx that perform a full build for Spryker Zed UI applications. 
It also provide access to its settings and `webpack` configuration so you are able
to extend/change the building process for Zed.

## Requirements

- `nodejs` version 6.x LTS
- `npm` version >= 3.x *or* `yarn` version >= 0.19.x

## Setup

You need to add oryx-for-zed to your `package.json`; 
open the terminal, go to your project root folder and type:

```bash
npm install @spryker/oryx-for-zed --save-dev
# or 
yarn add @spryker/oryx-for-zed --dev
```

oryx comes with a peer dependency:

- `oryx` version >= 0.3.x

## Usage

Once installed, you can:

- call the builder directly from your scripts
- extend/change the settings/`webpack`configuration for your custom Zed build

### Simple builder

The easiest way to run oryx-for-zed is to add a script to your `package.json`:

```json
{
    "scripts": {
        "build-zed": "node ./node_modules/@spryker/oryx-for-zed/build"
    }
}
```

Then just open the terminal and type:

```bash
npm run build-zed
# or 
yarn run build-zed
```

### Extend/change settings

If you want to customise settings, just rely on onyx-for-zed API.

#### build.js
Create a `build.js` file in your project containing custom settings,
the logic needed to pass them to the `webpack` configuration 
and the builder:

```js
const oryx = require('@spryker/oryx');
const oryxForZed = require('@spryker/oryx-for-zed');

const myCustomZedSettings = Object.assign({}, oryxForZed.settings, {
    // your own settings
});

const configuration = oryxForZed.getConfiguration(myCustomZedSettings);

oryx.build(configuration);
```

#### package.json
Add a script into your `package.json` pointing to `build.js`. 

```json
{
    "scripts": {
        "build-zed": "node ./path/to/build"
    }
}
```

### Extend/change `webpack` configuration

If you want to customise the configuration, just rely on onyx-for-zed API.
As you can see, you can decideto change settings too.

#### webpack.config.js
Create a `webpack.config.js` file in your project containing 
your `webpack` custom configuration: 

```js
const oryxForZed = require('@spryker/oryx-for-zed');
const defaultConfiguration = oryxForZed.getConfiguration(oryxForZed.settings);

const myCustomZedConfiguration = Object.assign({}, defaultConfiguration, {
    // your own configuration
});

module.exports = myCustomZedConfiguration;
```

#### build.js
Create a `build.js` file in your project containing 
the logic needed to pass the custom `webpack` configuration to the builder:

```js
const oryx = require('@spryker/oryx');
const myCustomZedConfiguration = require('./webpack.config.js');

oryx.build(myCustomZedConfiguration);
```

#### package.json
Add a script into your `package.json` pointing to `build.js`. 

```json
{
    "scripts": {
        "build-zed": "node ./path/to/build"
    }
}
```

### API

- [settings](#settings)
- [getConfiguration()](#getconfiguration)
- [CLI args](#cli-args)

#### settings

```
oryxForZed.settings
```

Contain all the basic setting used in the `webpack` configuration.
[Look here (code)]() for more details.

#### getConfiguration()

```
oryxForZed.getConfiguration(settings)
```

Return the default Zed `webpack` configuration, based on provided `settings`.
[Look here (code)]() for more details.

#### CLI args

oryx-for-zed uses some arg to customise the build process.
You can pass them by terminal:

```bash
npm run script-name -- --arg
# or 
yarn run script-name -- --arg
```

Or embedding them into the script section in `package.json`:

```json
{
    "scripts": {
        "build-zed": "node ./node_modules/@spryker/oryx-for-zed/build --arg"
    }
}
```

##### Args list

- `--dev`: development mode; enable `webpack` watchers on the code
- `--prod`: production mode; enable assets optimisation/compression

If no arg is passed, development is activated but without watchers.


