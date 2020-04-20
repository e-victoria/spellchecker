import SpellChecker from '../../public/js/SpellChecker';
const fs = require('fs');
let spellChecker;
let wordsList = new Map();

describe("SpellChecker", function () {
  beforeEach(function () {
    spellChecker = new SpellChecker();
    let words = fs.readFileSync(__dirname + '/test.txt', 'utf-8').split('\n');
    words.map((word) => {
      wordsList.set(word, true);
    });
  });

  it("should find replacement 'accord' for 'bccord'", function () {
    const actual = spellChecker.findWordReplacement('bccord', wordsList);
    const expected = ['accord'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'aat' for 'cat'", function () {
    const actual = spellChecker.findWordReplacement('aat', wordsList);
    const expected = ['bat', 'cat', 'eat', 'fat', 'hat', 'mat'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'nilhes' for 'cat'", function () {
    const actual = spellChecker.findWordReplacement('nilhes', wordsList);
    const expected = ['niches'];

    expect(actual).toEqual(expected);
  });

});