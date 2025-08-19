// Função para verificar se um caractere é uma vogal
function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(char);
}

// Função para verificar se um caractere é uma consoante
function isConsonant(char) {
  const code = char.charCodeAt(0);
  return !isVowel(char) && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122));
}

// Função para obter a próxima vogal
function getNextVowel(vowel) {
  const vowelMap = {
    a: 'e',
    e: 'i',
    i: 'o',
    o: 'u',
    u: 'a',
    A: 'E',
    E: 'I',
    I: 'O',
    O: 'U',
    U: 'A'
  };
  return vowelMap[vowel] || vowel;
}

// Função principal para transformar a string
function transformString(input) {
  // Passo 1: Extrair consoantes e inverter sua ordem
  const consonants = [];
  for (const char of input) {
    if (isConsonant(char)) {
      consonants.push(char);
    }
  }
  consonants.reverse();

  // Passo 2: Construir a nova string
  let result = '';
  let consonantIndex = 0;

  for (const char of input) {
    if (isVowel(char)) {
      // Se for vogal, converter para a próxima vogal
      result += getNextVowel(char);
    } else if (isConsonant(char)) {
      // Se for consoante, pegar a próxima da lista invertida
      result += consonants[consonantIndex++];
    } else {
      // Manter outros caracteres (espaços, pontuação, etc.)
      result += char;
    }
  }

  return result;
}

// Função para exibir o resultado
function displayResult(input, output) {
  const resultElement = document.getElementById('resultOutput');

  // Limpar resultado anterior
  resultElement.innerHTML = '';

  // Criar elementos para mostrar o processo
  const inputPara = document.createElement('p');
  inputPara.innerHTML = `<strong>Entrada:</strong> "${input}"`;

  const outputPara = document.createElement('p');
  outputPara.innerHTML = `<strong>Saída:</strong> "${output}"`;
  outputPara.style.marginTop = '1rem';
  outputPara.style.color = '#00ff00';

  // Adicionar elementos ao resultado
  resultElement.appendChild(inputPara);
  resultElement.appendChild(outputPara);
}

// Adicionar event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  const convertBtn = document.getElementById('convertBtn');
  const returnBtn = document.getElementById('returnBtn');
  const inputText = document.getElementById('inputText');

  // Evento para o botão Converter
  convertBtn.addEventListener('click', function () {
    const input = inputText.value.trim();

    if (input) {
      const result = transformString(input);
      displayResult(input, result);
    } else {
      alert('Por favor, digite um texto para converter.');
    }
  });

  // Evento para o botão Retornar
  returnBtn.addEventListener('click', function () {
    inputText.value = '';
    document.getElementById('resultOutput').innerHTML = '';
  });
});
