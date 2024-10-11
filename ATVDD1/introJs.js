//crie um programa que receba 4 numeros o nome do aluno 4 notas e calcule a media e mostre em um h2
const frm = document.querySelector("form");
const resp = document.querySelector("h3");
const media = document.querySelector("h2")

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = frm.inNome.value;
  resp.innerText = `Olá ${nome} seja bem vindo!`

    const n1 = parseFloat(frm.n1.value);
    const n2 = parseFloat(frm.n2.value);
    const n3 = parseFloat(frm.n3.value);
    const n4 = parseFloat(frm.n4.value);

    const mediaAluno = ((n1 + n2 + n3 + n4) / 4);
   
    media.innerText = `A média do aluno é ${mediaAluno.toFixed(2)}`;

    if(mediaAluno>=7.0){
        resp.innerText="Colando até eu - Aprovado";
        media.style.color="blue";
    }
    if(mediaAluno<=6.9 && mediaAluno>=4){
        resp.innerText="Ta na Bosta - Recuperação";
        media.style.color="green";
    }
    if(mediaAluno<3.9){
        resp.innerText="Se Fodeu - Reprovado";
        media.style.color="red";
        }
});