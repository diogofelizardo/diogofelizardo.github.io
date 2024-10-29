function primeiraFuncao() {
  segundaFuncao();
}
function segundaFuncao() {
  terceiraFuncao();
}
function terceiraFuncao() {
  console.trace("Rastreamento da stack");
}
primeiraFuncao();