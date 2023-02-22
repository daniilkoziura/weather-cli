//err, succ, warn, help
import chalk from "chalk";
import dedent from "dedent";

const printError = error => console.log(`${chalk.bgRed(` ERROR: `)} ${error}`);

const printSuccess= message => console.log(`${chalk.bgGreen(` SUCCESS: `)} ${message}`);

const printHelp =  () => {
    console.log(
        dedent(`${chalk.bgCyan(' Help ')}
        Withour params - print the weather
        -s [CITY] set city
        -h  view help
        -t [API_KEY] set and save token
        `)
    );
};

export {printError, printSuccess, printHelp};