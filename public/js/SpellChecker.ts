import InputReader from './InputReader';
import StringHasher from './StringHasher';

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
        const stringHasher: StringHasher = new StringHasher();
        const hashedInput = stringHasher.hash(word);
        console.log(hashedInput);
    }
}