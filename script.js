//Criando array de musicas com objetos de cada música
let musicas = [
    //Chaves representam objetos que contem um propriedade e seu valor
    {
        titulo : 'Guitar solo',
        artista:'Blinder Boy',
        src    :'musicas/Spooky Boop - Otis McDonald.mp3',
        img    :'imagens/rock.jpg'},
    {
        titulo : 'Samba',
        artista: 'Alele',
        src    : 'musicas/Ice & Fire - King Canyon.mp3',
        img    : 'imagens/samba.jpg'},
    {
        titulo :'Calma piano',
        artista:'John LE', 
        src    :'musicas/God Rest Ye Merry Gentlmen - DJ Williams.mp3', 
        img    :'imagens/rock2.jpg'},
    {
        titulo : 'Tal',
        artista: 'It',
        src    : 'musicas/It Was a Time - TrackTribe.mp3',
        img    :'imagens/samba.jpg'
    }
]

let musica = document.querySelector('audio');
let indexMusica = 0;

    //Selecionando os itens referente a cada música
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

            // Eventos
     //Adicionando o evento de click no botão play, passando a função tocarMusica
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
    //Adicionando o evento de click no botão pause, passando a função pausarMusica  
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);
    //Adicionando evento de clique no botão anterior e criando uma função anônima para o botão
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});
    //Adicionando evento de clique no botão próxima e criando uma função anônima para o botão
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    //Substituindo o valor do src original pelo src que está dentro do array música, esse novo valor está sendo passdo pelo seu index dentro do array
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}
     //Função para tocar música, função passado no envento do botão play
function tocarMusica(){
    musica.play();
        //Após clicar no botão play, aparece o botão pause, o botão pause não fica visivel antes de clicar no play pois no CSS defini display= 'none'
    document.querySelector('.botao-pause').style.display = 'block';
        //Após clicar no botão play, aparece o botão pause e o botão play não fica mais visivel
    document.querySelector('.botao-play').style.display = 'none';
}
    //Função pusar música, função  passado no envento do botão pause
function pausarMusica(){
    musica.pause();
        //Após clicar no botão pause a musica pare, botão pause some e aparece o botão play
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
         //Modificando o style da barra conforme a musica toca, pegando a posição atual da musica dividindo pela duração total da musica e multiplicando por 100 para ficar em porcentagem, concatenando o número com o  sinal da %. Para não ficar um número quebrado, utilizo o Math.floor para arrendodar o número para baixo
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}

