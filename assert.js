const msgErro = 'o número não é par';
for (let num = 2; num <= 5; num++) {
  console.log(`O número é ${num}`);
  console.assert(num % 2 === 0, { num }, msgErro);
}