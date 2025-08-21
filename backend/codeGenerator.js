// Generates a unique code in the format "NA123VS"
function generateCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const rand = (arr, n) => [...Array(n)].map(() => arr[Math.floor(Math.random() * arr.length)]).join('');
  return rand(letters, 2) + rand(numbers, 3) + rand(letters, 2);
}

module.exports = { generateCode };
