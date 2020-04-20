import InputReader from './InputReader';
import StringHasher from './StringHasher';
import FileParser from './FileParser';
import { stringify } from 'querystring';

export default class SpellChecker {
    private abc = 'abcdefghijklmnopqrstuvwxyz'.split('');
    private wordsList: Map<string, boolean>;
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

        this.wordsList = fileReader.readFile();
        if (this.wordsList.has(word)) {
            alert('ok, it\'s a word!');
        }
        else {
            const replacement = this.findWordReplacement(word);
            if (replacement.length > 0) {
                alert(`Maybe you meant: ${replacement}?`);
            } else {
                alert('No replacements :(');
            }
        }
    }

    findWordReplacement(word): Array<string> {
        let replacement: Array<string> = [];
        let newWord: string;

        for (let i: number = 0; i < word.length - 1; i++) {
            for (let letter of this.abc) {
                newWord = word.substring(0, i) + letter + word.substring(i + 1, word.length);
                if (this.wordsList.has(newWord)) {
                    console.log(newWord);
                    replacement.push(newWord);
                }
            }
        }

        return replacement;
    }
}