//faça 4 iputs que mostre a soma e a media dos números digitados

const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');
const resp = document.querySelector('#resultado');
function calcular() {

    const num1 = parseFloat(document.getElementById('num1').value);
    console.log(num1);
    const num2 = parseFloat(document.getElementById('num2').value);
    console.log(num2);
    const num3 = parseFloat(document.getElementById('num3').value);
    console.log(num3);
    const num4 = parseFloat(document.getElementById('num4').value);
    console.log(num4);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4)) {
        alert('Por favor, insira apenas números!');
        return;
    }  
    
    const soma = num1 + num2 + num3 + num4;
    const media = soma / 4;

    resp.innerText =`a soma é ${soma} e a média é ${media}`
    
}













