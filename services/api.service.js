// import https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

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

    /**  USING buil-in Node js HTTP library
    const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'en');

    return new Promise((resolve, reject) => {

        https.get(url, (response) => {
            let res = '';
    
            response.on('data', (chunk) => res += chunk)
    
            response.on('end', () => {
                res = JSON.parse(res);
                const resLatLong =  {
                    "lat": res[0].lat,
                    "lon": res[0].lon
                }
                
                resolve(resLatLong);
            });
    
            response.on('error', err => reject(error => console.log(error)));
        });
    });
    */
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

    /**  USING buil-in Node js HTTP library
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('lat', latLon.lat);
    url.searchParams.append('lon', latLon.lon);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'en');
    url.searchParams.append('units', 'metric');
    
    https.get(url, response => {
        let res = '';
    
        response.on('data', (chunk) => res += chunk);

        response.on('end', () => {
                console.log(res);
        });
    });
    */
};

export {getWeather, getLatLon};