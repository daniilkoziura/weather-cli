#!usr/bin/env node  
//обїявление что приложеніе будет CLI

import { getArgs } from './helpers/args.js';
import { printHelp } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // save city
    }

    if (args.t) {
        // save token
        saveKeyValue('token', args.t);
    }

    // pogoda vivod
};

initCLI();