// Chama a função que busca a quantidade de paginas disponiveis
getQtPages();
var escolhas = []; // vai armazenar globalmente as 4 escolhas aleatorias dentro da pagina selecionada
var page = 0; // vai armazenar globalmente a quantidade de paginas disponiveis

function getQtPages() {
/*
	Função que busca a quantidade de páginas na api
*/
	let request = new XMLHttpRequest(); //Objeto que faz a request
	request.open('GET', 'https://rickandmortyapi.com/api/character', true); //abre a conexão

	//executa assincronamente aguandando o resultado da requisicao
	request.onload = function() {
		if(request.status == 200) { // se o resultado for 200 OK, executa
			let resp = request.responseText; // guarda a resposta em text
			let data = JSON.parse(resp); //transforma a resposta em JSON					
			
			page = getNumber(1, data.info.pages); // Acessa quantidade de páginas e já utiliza essa quantidade para selecionar um numero entre 1 e data.info.pages
			getData(page); // chama a proxima função que busca os dados apenas da página aleatóriamente escolhida
		}
	}
	request.send(); // executa a primeira chamada assincrona que roda a busca pela página
}


function getData(page) {
/* função que busca os dados especificamente da página passada como parametro */
	let request = new XMLHttpRequest(); // novo objeto que executara a requisição
	request.open('GET', 'https://rickandmortyapi.com/api/character?page=' + page, true); //abre uma nova requisição

	request.onload = function() { //nova execução assincrona
		if(request.status == 200) { // se o status da resposta for OK executa
			let resp = request.responseText; // armazena a resposta em text
			let data = JSON.parse(resp); // converte a resposta para JSON
			let results = data['results']; // seleciona apenas resultados
			
			let page_ini = ((page - 1) * 20) + 1; // define o inicio do intervalo de paginação
			let page_fin = ((page - 1) * 20) + 21;// define o final do intervalo de paginação
			
			let escolha_items = generate_escolhas(page_ini, page_fin); // gera as escolhas aleatórias dentro da página escolhida
			let escolhas_unique = [...new Set(escolha_items)]; // seleciona apenas as escolhas unicas
			
			while(escolhas_unique.length != 4) { // se as escolhas unicas forem diferente de 4, repete o processo
				escolha_items = generate_escolhas(page_ini, page_fin); // gerando novas escolhas
				escolhas_unique = [...new Set(escolha_items)]; // selecionando somente as distintas novamente
			}
			
			escolhas = escolhas_unique; // seta as escolhas unicas como global.
			
			results.forEach(character); // percorre os 20 resultados da página de resposta
		}
	}
	
	request.send(); //executa a chamada da requisição na api
}			

function character(item) { // função que é executada em cada item do loop no foreach
	if(escolhas.includes(item.id)) { // se o item.id estiver em escolhas -> executa a adição desse dado na tabela html
		document.getElementById('data').innerHTML += `
			<div class="containerPersonagens">
					<img src="${item.image}">
					<h3 class="containerNames">${item.name}</h3>
			</div>
			
		`; // adicionar a linha html com o dado ${item.name} ${item.image}
	}
}

function generate_escolhas(page_ini, page_fin) {
	return [getNumber(page_ini, page_fin), getNumber(page_ini, page_fin),
			getNumber(page_ini, page_fin), getNumber(page_ini, page_fin)]
}


function getNumber(inicio, fim) { // função que gera um numero aleatório no intervalo
	return Math.floor(Math.random() * (fim - inicio)) + inicio; // return um numero inteiro (Math.floor), no intervalo indicado com inicio e fim
}

function resetPersonagens() { // função para atualizar os personagens sem recarregar a página
	document.getElementById('data').innerHTML = '' // renova os personagens sem necessidade de atualizar a página
	getQtPages()
}