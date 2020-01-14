const arrays = [['$6'], ['$12'], ['$25'], ['$25'], ['$18'], ['$22'], ['$10']];
const merged = [].concat.apply([], arrays);

console.log(merged);
