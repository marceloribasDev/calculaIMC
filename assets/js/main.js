// Não faz o auto reload da quando clica no botão enviar.
const form = document.querySelector('#formulario');

// Evita o reload automatico quaado clicar no botao enviar.
form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  // Captura os valores do form
  const inputPeso = evento.target.querySelector('#peso');
  const inputAltura = evento.target.querySelector('#altura');

  // Converte o valor digitado para number
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  // Valida se o que foi digitado sao numero, qualquer outro tera erro
  if (!peso) {
    setResultado("Peso Inválido.", false);
    return;
  }

  // Valida se foi digita um number ou float, qualquer outro tera erro.
  if (!altura) {
    setResultado("Altura Inválida.", false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getImcNivel(imc);


  const msg = `Seu IMC é ${imc} (${nivelImc})`;

  setResultado(msg, true);

  // console.log(imc, nivelImc);
});

// Faz o calculo do IMC
function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
};

function getImcNivel(imc) {
  const nivel = [
    "Abaixo do peso",
    "Peso Normal",
    "Sobrepeso",
    "Obesidade Grau 1",
    "Obesidade Grau 2",
    "Obesidade Grau 3"
  ]

  // Quando o if for pequena podemos retornar como abaixo
  if (imc > 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
};

// Cria p no html
function criaP() {
  const p = document.createElement('p');
  return p;
};

// Mostra o resultado da validação do IMC na tela.
function setResultado(msg, isValid) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = "";

  // Instancia a funcao criaP
  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado')
  } else {
    p.classList.add('bad')
  }

  p.innerHTML = msg;

  resultado.appendChild(p);

};
