import InputReader from './InputReader';
import FileParser from './FileParser';

export default class SpellChecker {
    private abc = 'abcdefghijklmnopqrstuvwxyz'.split('');
    init(): void {
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
        let replacementByCharacterAdding: Array<string>;
        let replacementByCharacterDeleting: Array<string>;
        let replacementByCharacterReplacement: Array<string>;
        if (wordsList.has(word)) {
            console.log('ok, it\'s a word!');
        }
        else {
            replacementByCharacterDeleting = this.findWordByCharacterDeleting(word, wordsList);
            replacementByCharacterAdding = this.findWordByCharacterAdding(word, wordsList);
            replacementByCharacterReplacement = this.findWordByCharacterReplacement(word, wordsList);
            let replacement = new Set([...replacementByCharacterReplacement, ...replacementByCharacterAdding, ...replacementByCharacterDeleting]);
            if (replacement.size > 0) {
                console.log(`Maybe you meant: ${Array.from(replacement)}?`);
            } else {
                console.log('No replacements :(');
            }
            return replacement;
        }
    }

    findWordByCharacterDeleting(word, wordsList) {
        let replacement: Array<string> = [];
        let newWord: string;

        for (let i: number = 0; i < word.length; i++) {
            newWord = word.substring(0, i) + word.substring(i + 1);
            if (wordsList.has(newWord)) {
                replacement.push(newWord);
            }
            if (replacement.length > 3) {
                break;
            }
        }

        // newWord = word.substring(0, i) + word.substring(i + 1, word.length);
        //     if (wordsList.has(newWord)) {
        //         replacement.push(newWord);
        //     }

        return replacement;
    }

    findWordByCharacterAdding(word, wordsList) {
        let replacement: Array<string> = [];
        let newWord: string;

        for (let i: number = 0; i < word.length - 1; i += 2) {

            for (let letter of this.abc) {
                newWord = word.substring(0, i) + letter + word.substring(i, word.length);
                if (wordsList.has(newWord)) {
                    replacement.push(newWord);
                }
                if (replacement.length > 3) {
                    break;
                }
            }
        }

        for (let letter of this.abc) {
            newWord = word.substring(0, word.length) + letter + word.substring(word.length);
            if (wordsList.has(newWord)) {
                replacement.push(newWord);
            }
            if (replacement.length > 3) {
                break;
            }
        }
        return replacement;
    }

    findWordByCharacterReplacement(word, wordsList) {
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