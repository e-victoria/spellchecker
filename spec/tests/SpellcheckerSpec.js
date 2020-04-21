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
    const actual = spellChecker.checkWord('bccord', wordsList);
    const expected = ['accord'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'accord' for 'ccord'", function () {
    const actual = spellChecker.checkWord('ccord', wordsList);
    const expected = ['chord', 'accord'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'scampi' for 'scmpi'", function () {
    const actual = spellChecker.checkWord('scmpi', wordsList);
    const expected = ['scampi'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'rotting' for 'rottin'", function () {
    const actual = spellChecker.checkWord('rottin', wordsList);
    const expected = ['rotten', 'rotting'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'aat' for 'cat'", function () {
    const actual = spellChecker.checkWord('aat', wordsList);
    const expected = ['bat', 'cat', 'eat', 'fat', 'hat', 'mat'];

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'nilhes' for 'cat'", function () {
    const actual = spellChecker.checkWord('nilhes', wordsList);
    const expected = ['niches'];

    expect(actual).toEqual(expected);
  });

});