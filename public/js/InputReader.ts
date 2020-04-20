export default class InputReader {
    getInputValue(): string {
        let inputValue: string = '';
        const btn = document.getElementById('box-btn');

        btn.onclick = (e) => {
            e.preventDefault();
            const input = (<HTMLInputElement>document.getElementById('user-input')).value;
            if (input) {
                inputValue = input;
            } else {
                alert('This field can\'t be empty!');
            }
        }
        return inputValue;
    }
}