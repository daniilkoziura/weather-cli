import axios from 'axios';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import { printSuccess, printError, printWeather } from './log.service.js';


const getIcon = icon => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
            break;
        case '02':
            return '🌤';
        break;
        case '03':
            return '☁️';
            break;
        case '04':
            return '☁️';
        break;    
        case '09':
            return '🌧';
            break;
        case '10':
            return '🌦';
        break;
        case '11':
            return '🌩';
            break;
        case '13':
            return '❄️';
        break;  
        case '50':
            return '🌫';
        break; 
        default:
            break;
    }
};

const getLatLon = async (city) => {

    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

    if (!token) {
        throw new Error('Token did not provided use -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token,
            lang: "en"
        }
    });
    
    return {
        lat: data[0].lat,
        lon: data[0].lon,
    }
};


const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);

    if (!token) {
        throw new Error('Token did not provided use -t [API_KEY]');
    }
    
    const latLon = await getLatLon(city);

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: latLon.lat,
            lon: latLon.lon,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    });

    return data;
};

const saveToken = async token => {
    if (!token.length) {
        printError(`Token has not been provide`);
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token has been saved');
    } catch (error) {
        printError(`${error.message}`);
    }
};

const saveCity = async city => {
    try {
        if (!city.length) throw Error('Type a city');

        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City has been saved');
    } catch (error) {
        printError(error.message);
    }
}

const getForcast = async () => {
    try {
        const weather =  await getWeather(process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city));
        printWeather(weather);
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('Wrong City');
        } else if (error?.response?.status == 401) {
            printError('Wrong Token');
        } else {
            printError(error.message);
        }
    }
}

export {getWeather, getLatLon, getForcast, saveToken, saveCity, getIcon};