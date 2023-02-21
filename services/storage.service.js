import { homedir } from 'os';
import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = (key, value) => {
    console.log(basename(filePath)); //get file name
    console.log(dirname(filePath)); //get folder(s)
    console.log(extname(filePath)); // get file extension
    console.log(isAbsolute(filePath)); // абсолбтній ли файл тру потому шо мі не мапим никаких папок
    console.log(relative(filePath, dirname(filePath))); //path between 1 and 2 files
    console.log(resolve("..")); // do action, in our case step back and ls
    console.log(sep); // defince curr os seprator

};

export {saveKeyValue}