import chalk from "chalk";
import dedent from "dedent";
import { getIcon } from "./api.service.js";

const printError = error => console.log(`${chalk.bgRed(` ERROR: `)} ${error}`);

const printSuccess= message => console.log(`${chalk.bgGreen(` SUCCESS: `)} ${message}`);

const printHelp =  () => {
    console.log(
        dedent(`${chalk.bgCyan(' Help ')}
        -s [CITY] set city
        -h  view help
        -t [API_KEY] set and save token from https://api.openweathermap.org
        `)
    );
};

const a = w => {
    const result = {
        "temperature": w.main.temp,
        "feels_like": w.main.feels_like,
        "wind_speed": w.wind.speed,
        "city": w.name,
        "country": w.sys.country
    };

    console.table(result);
}

const printWeather =  (res) => { 
    console.log(
        dedent(`${chalk.bgYellow(' WEATHER ')} in ${chalk.green(chalk.bold(res.name))} 
        ${getIcon(res.weather[0].icon)} ${res.weather[0].description}
        Temperature: ${chalk.blue(res.main.temp)} but feels like ${chalk.blue(res.main.feels_like)}
        Humidity: ${chalk.cyanBright(res.main.humidity)} %
        Wind speed: ${chalk.redBright(res.wind.speed)}
        Country: ${chalk.magentaBright(res.sys.country)}
        `)
    );
};

export {printError, printSuccess, printHelp, printWeather};