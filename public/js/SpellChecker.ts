import InputReader from './InputReader';
import FileParser from './FileParser';

export default class SpellChecker {
    private abc = 'abcdefghijklmnopqrstuvwxyz'.split('');
    init() {
        const that = this;
        function callback(word: () => void) {
            const filepath: string = __dirname + 'resources/wordlist.txt';
            const fileReader: FileParser = new FileParser(filepath)
    
            const wordsList: Map<string, boolean> = fileReader.readFile();
            that.checkWord(word, wordsList);
        }
        const inputReader: InputReader = new InputReader();
        const word = inputReader.getInputValue(callback);
    }

    checkWord(word, wordsList) {
        let replacement: Array<string>;
        if (wordsList.has(word)) {
            console.log('ok, it\'s a word!');
        }
        else {
            replacement = this.findWordReplacement(word, wordsList);
            if (replacement.length > 0) {
                console.log(`Maybe you meant: ${replacement}?`);
            } else {
                console.log('No replacements :(');
            }
        }
        return replacement;
    }

    findWordReplacement(word, wordsList): Array<string> {
        let replacement: Array<string> = [];
        let newWord: string;

        for (let i: number = 0; i < word.length - 1; i++) {
            for (let letter of this.abc) {
                newWord = word.substring(0, i) + letter + word.substring(i + 1, word.length);
                if (wordsList.has(newWord)) {
                    replacement.push(newWord);
                }
                if (replacement.length > 5) {
                    break;
                } 
            }
        }

        return replacement;
    }
}