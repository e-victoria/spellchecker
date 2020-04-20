import InputReader from './InputReader';
import StringHasher from './StringHasher';
import FileParser from './FileParser';

export default class SpellChecker {
    init() {
        const that = this;
        function callback(word: () => void) {
            that.checkWord(word);
        }
        const inputReader: InputReader = new InputReader();
        const word = inputReader.getInputValue(callback);
    }

    checkWord(word) {
        const filepath: string = __dirname + 'resources/wordlist.txt';
        const fileReader: FileParser = new FileParser(filepath)
        const stringHasher: StringHasher = new StringHasher();

        const wordsList: Map<string, boolean> = fileReader.readFile();
        if (wordsList.has(word)) {
            alert('match!');
        }
    }
}