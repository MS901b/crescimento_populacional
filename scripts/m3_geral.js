/********************
 * Funcoes do Flash *
 ********************/
// Retorna uma Array com todas as inputs que começam com "parte"
function pegaNomesResp() {
    var allElements = document.getElementsByTagName('*');

    var allNames = Array();

    for (var i = 0; i < allElements.length; i++) {
        if ((allElements[i].id != null) && (allElements[i].id.startsWith('parte'))) {
            allNames.push(allElements[i].id);
        }
    }
    return allNames.uniq();
}

/* Retorna o elemento do video Flash com o nome movieName
function getFlashMovie(movieName) {
	
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}*/

//Funcao que pega no flash o valor da resposta do id passado.
function getResp(id) {
    return $('SalvaLocal').Pega(nomeSoft, id);
}

//Funcao que guarda no flash o valor da resposta do id passado.
function setResp(id, valor) {
    $('SalvaLocal').Salva(nomeSoft, id, valor);
}

// Apaga todas as resposta guardadas.
function apagaTodasResp() {
    return $('SalvaLocal').ApagaTudo(nomeSoft);
}

/* Retorna uma string de uma estrutura XML
 * Pega de http://www.webdeveloper.com/forum/showthread.php?t=187378
 * **NOTA** No Geogebra 3.2 nao parece ser necessário realizar esse passo.
 */
function xml2Str(xmlNode) {
    try {
        // Gecko-based browsers, Safari, Opera.
        return (new XMLSerializer()).serializeToString(xmlNode);
    } catch (e) {
        try {
            // Internet Explorer.
            return xmlNode.xml;
        } catch (e) {
            //Other browsers without XML Serializer
            alert('Xmlserializer not supported');
        }
    }
    return false;
}

/**
 * Funcao que deve ser generica para validar respostas. EM IMPLEMENTACAO.
 * @param {Object} valor
 */
function validaResp(valor) {
    if (valor == '') {
        return false;
    }
    return true;
}