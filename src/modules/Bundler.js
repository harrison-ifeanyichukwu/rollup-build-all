import path from 'path';
import fs from 'fs';

import Util from './Util.js';
import _config from '../.buildrc.json';

export default class Bundler {

    /**
     *@param {Object} [uglifierPlugin=null] - uglifier plugin to use
     *@param {Array} [otherPlugins=[]] - array of other plugins to use. defaults to empty array
     *@param {string} [configPath='.buildrc.json'] - config file location relative url
    */
    constructor(uglifierPlugin, otherPlugins, configPath) {
        this.plugins = Util.isArray(otherPlugins)? otherPlugins : [];
        this.pluginsWithUglifer = uglifierPlugin? [...this.plugins, uglifierPlugin] : null;
        this.configPath = typeof configPath === 'string'? configPath : '.buildrc.json';
    }

    /**
     * return class identity
    */
    get [Symbol.toStringTag]() {
        return 'Bundler';
    }

    /**
     * resolves the pattern into a regex object
     *@param {Array|string|RegExp} patterns - array of patterns or string pattern
     *@param {Array} regexStore - array to store regex objects
    */
    resolveRegex(patterns, regexStore) {
        if (typeof patterns === 'string') {
            if (patterns === '*') {
                regexStore.push(new RegExp('.*'));
            }
            else {
                patterns = patterns.replace(/\./g, '\\.').replace(/\*{2}/g, '.*')
                    .replace(/\*/g, '[^/]+');
                regexStore.push(new RegExp(patterns, 'i'));
            }
        }

        else if (patterns instanceof RegExp) {
            regexStore.push(patterns);
        }

        else if (Util.isArray(patterns)) {
            for (let pattern of patterns)
                this.resolveRegex(pattern, regexStore);
        }

        return regexStore;
    }

    /**
     * returns the entry path
    */
    getEntryPath(mainFileName) {
        if (mainFileName.indexOf('node_modules') > 0)
            return mainFileName.split('/node_modules')[0];

        let currentPath = path.join(mainFileName, '../'),
        rightPath = '';
        while (currentPath !== '/') {
            if (fs.existsSync(currentPath + '/package.json')) {
                rightPath = currentPath;
                break;
            }
            currentPath = path.join(currentPath, '../');
        }
        return rightPath;
    }

    /**
     * runs the process
     *@returns {Array}
    */
    process() {
        //resolve user defined settings
        let entryPath = this.getEntryPath(require.main.filename),
        config = null;

        if (fs.existsSync(entryPath + '/' + this.configPath))
            config = Object.assign({}, _config, require(entryPath + '/' + this.configPath));
        else
            config = _config;

        //extract lib and dist configs
        let libConfig = config.libConfig,
        distConfig = config.distConfig,

        //define includes and excludes regex
        includes = this.resolveRegex(config.include, []),
        excludes = this.resolveRegex(config.exclude, []);
    }
}