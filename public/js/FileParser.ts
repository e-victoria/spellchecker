export default class FileParser {
    private filepath;

    constructor(filepath) {
        this.filepath = filepath;
    }

    getFile() {
        
    }

    readFile(): Map<string, boolean> {
        let wordsList: Map<string, boolean> = new Map();
        const xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', this.filepath, false);
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState === 4) {
                if (xmlHttpRequest.status === 200) {
                    const word = xmlHttpRequest.responseText.split('\r\n');
                    word.map((word) => {
                        wordsList.set(word, true);
                    })
                }
            }
        }
        xmlHttpRequest.send();
        
        
        return wordsList;
    }
}