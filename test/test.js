
describe('Start Jest', () => {
  describe('Jest test', () => {
    const sum = (a, b) => (a + b);
    const subtract = (a, b) => (a - b);
    test('two plus two is four', () => {
      expect(sum(2, 2)).toBe(4);
    });
    test('minus one thats three, quick mafs', () => {
      expect(subtract(4, 1)).toBe(3);
    })
  });
});