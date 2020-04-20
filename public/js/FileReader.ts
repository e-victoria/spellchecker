import { readFileSync } from 'fs';

export class FileReader {
    private file;

    constructor (file) {
        this.file = file;
    }

    readFile(): Array<string> {
        const wordsList: Array<string> = readFileSync(this.file, 'utf8').split('\r\n');
        return wordsList;
    }
}