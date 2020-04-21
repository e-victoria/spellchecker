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
    const expected = new Set(['accord']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'taxicab' for 'taxiclab'", function () {
    const actual = spellChecker.checkWord('taxiclab', wordsList);
    const expected = new Set(['taxicab']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'pluckier' for 'pluckierd'", function () {
    const actual = spellChecker.checkWord('pluckierd', wordsList);
    const expected = new Set(['pluckier']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'accord' for 'ccord'", function () {
    const actual = spellChecker.checkWord('ccord', wordsList);
    const expected = new Set(['chord', 'accord']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'scampi' for 'scmpi'", function () {
    const actual = spellChecker.checkWord('scmpi', wordsList);
    const expected = new Set(['scampi']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'descent' for 'decsent'", function () {
    const actual = spellChecker.checkWord('decsent', wordsList);
    const expected = new Set(['decent', 'descent']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'rotting' for 'rottin'", function () {
    const actual = spellChecker.checkWord('rottin', wordsList);
    const expected = new Set(['rotten', 'rotting']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'divestment' for 'rdivestment'", function () {
    const actual = spellChecker.checkWord('rdivestment', wordsList);
    const expected = new Set(['divestment']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'quizzed' for 'quizzde'", function () {
    const actual = spellChecker.checkWord('quizzde', wordsList);
    const expected = new Set(['quizzed']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'aat' for 'cat'", function () {
    const actual = spellChecker.checkWord('aat', wordsList);
    const expected = new Set(['bat', 'cat', 'eat', 'hat', 'mat', 'at']);

    expect(actual).toEqual(expected);
  });

  it("should find replacement 'nilhes' for 'cat'", function () {
    const actual = spellChecker.checkWord('nilhes', wordsList);
    const expected = new Set(['niches']);

    expect(actual).toEqual(expected);
  });

});