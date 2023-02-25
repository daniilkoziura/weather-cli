#!usr/bin/env node  
import { getArgs } from './helpers/args.js';
import { getForcast, saveToken, saveCity } from './services/api.service.js';
import { printHelp } from './services/log.service.js';

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        await saveCity(args.s);
    }

    if (args.t) {
        await saveToken(args.t);
    }

    await getForcast();
};

initCLI();