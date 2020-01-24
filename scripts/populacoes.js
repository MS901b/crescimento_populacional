/**
 * Funcao que compara duas funcoes para corrigir a expressao pedida nas questoes.
 * @param {Object} func1	funcao a ser corrigida
 * @param {Object} func2	funcao correta
 */
function compararFuncao(func1,func2) {
	var applet = document.ggbApplet;
	applet.deleteObject('func_1');
	applet.deleteObject('func_2');
	applet.deleteObject('func_3');
	applet.deleteObject('RespComparador');

	primeirafuncao = 'func_1(x)=' + func1;
	segundafuncao = 'func_2(x)=' + func2;
	applet.evalCommand(primeirafuncao);
	if(!applet.isDefined('func_1')) {
		return false;
	}
	applet.setVisible('func_1',false);
	applet.evalCommand(segundafuncao);
	applet.setVisible('func_2',false);
	applet.evalCommand('func_3(x)=abs(func_1(x)-func_2(x))');
	applet.setVisible('func_3',false);
	applet.evalCommand('RespComparador = Integral[func_3(x),-1,1]');
	applet.setVisible('RespComparador',false);
	saida = applet.getValue('RespComparador');
	//alert(saida);
		
	if (saida<0.001) 
		return true;
	else
		return false;
}

/* A funcao varre a string expressao procurando por letras que nao seja o  x. */
function verificaFuncao(expressao) {
	if(expressao=='') {
		return false;
	}
	if( (expressao.search(/[a-w]/gi) == -1) && (expressao.search(/[y-z]/gi) == -1) ) {
		return true;
	}
	return false;
}

/***********************************************
 * Funcoes gerais do funcionamento do software *
 ***********************************************/
function setAtividade(nome,estado,forcar) {
	if (forcar == undefined) {
		forcar=false;
	}
	
	if (!forcar) {
		if ((getResp(nome)<estado) || getResp(nome)=='') {
			setResp(nome,estado);
		}
	} else {
		setResp(nome,estado);
	}
}

function valida(valor) {
	valor = valor.replace('.',',');
	if ((valor==null) || (valor=='undefined')) {
		return '';
	}
	return valor;
}

/*****************************************
 * Funcoes do Matias de processar numero *
 *****************************************/
function validaExpressao(valor)
{
	valor = String(valor).replace(/\,/g,".");
	valor = valor.replace(/[0-9\+\-\*\/\(\)p\.]/gi,"");
	valor = valor.replace(/pi/gi,"");
	valor = valor.replace(/v/gi,"");
	valor = valor.replace(/\^/gi,"");
	valor = valor.replace(/[²³]/gi,"");
	valor = valor.replace(/\s/gi,"");
	if (valor.length==0) return true;
	else return false;
}


function contaParenteses(valor)
{

	valor = String(valor);
	var novovalor1 = valor.replace(/\)/g,"");
	var novovalor2 = valor.replace(/\(/g,"");
	
	return (novovalor1.length == novovalor2.length);

}

function processaExpressaoParenteses(valor)
{

	if ((valor!='') && (validaExpressao(valor)) && contaParenteses(valor))
	{
		var count = 0;
		var countMax = 0;
		valor = String(valor);
		valor = valor.replace(/\s/gi,"");

		for (var i=0;i<valor.length;i++) 
		{
			if (valor.charAt(i)=="(") 
				{
				count++;
				countMax=Math.max(countMax,count);
				valor = valor.replace(/\(/,"{"+String(count)+"}");
				}
			if (valor.charAt(i)==")") 
				{
				valor = valor.replace(/\)/,"{"+String(count)+"}");
				count--;
				}
		}
		
		

		var debug = 100;
		var conteudo = "";
		var elements = Array(); 
		while ((valor.indexOf('{')>-1) && (debug>0))
		{
			valor = valor.replace("{"+countMax+"}","{X}");
			valor = valor.replace("{"+countMax+"}","{X}");
			var re = /\{X\}(.*)\{X\}/;
			elements.push(re.exec(valor)[1]);
			valor = valor.replace(re,"["+Number(elements.size()-1)+"]");
			if (valor.indexOf("{"+countMax+"}")==-1) countMax--;
			debug--;	
		}
		elements.push(valor);

		
		for (var i=0;i<elements.size();i++) 
		{
			var re = /\[(.{0,2})\]/;
			
			debug = 100;
			while (re.test(elements[i]) && (debug>0))
			{
				elements[i]=elements[i].replace(re,'('+elements[re.exec(elements[i])[1]]+')');
				debug--;
			}

			elements[i]=processaExpressao(elements[i]);
			
		}
		
		return elements.last();
	
	} else return NaN;
	

}

function processaExpressao(valor)
{
	
	if ((valor!='') && (validaExpressao(valor)))
	{

		valor = valor.replace(/\,/g,".");
		valor = String(valor).replace(/pi/gi,'p');
		valor = colocaOperacoesPI(valor);
		valor = processaRaiz(valor);
		valor = valor.replace(/p/gi,'Math.PI');
		valor = processaPow(valor);
		valor = valor.replace(/\-\-/gi,'- -');
		
		try
		{
			eval('var resp='+valor);
		}
		catch (err) {var resp = NaN};
		return resp;
	}
	else return NaN;
}

function colocaOperacoesPI(valor)
{
	valor = String(valor).replace(/([0-9\)p\.])p/g,'$1*p');
	valor = String(valor).replace(/p([0-9\(p\.])/g,'p*$1');
	return valor;
}

function processaRaiz(valor)
{

	valor = String(valor).replace(/v([p,0-9\.\(\)²³]{0,})/g,'Math.sqrt($1)');
	return valor;
}

function processaPow(valor)
{	
	valor = String(valor).replace(/²/g,'^2');
	valor = String(valor).replace(/³/g,'^3');

	
	var re1 = /[\v\^\+\-\*\/]{1,}\^/;
	var re2 = /\^[\v\^\+\-\*\/]{1,}/;
	//alert(re1.test(valor));
	//alert(re2.test(valor));
	
	if ((re1.test(valor)) || (re2.test(valor))) {
		return 'Math.pow()';
	} 
	else
	{
		
		// (1) ^ (2)
		valor = String(valor).replace(/\(([\^p0-9\.\-]{1,})\)\^\(([\^p0-9\.\-]{1,})\)/g,'Math.pow($1,$2)');
		
		// 1 ^ (2)
		valor = String(valor).replace(/([vp,0-9\.]{1,})\^\(([p,0-9\.\-]{1,})\)/g,'Math.pow($1,$2)');
		
		// (1) ^ 2
		valor = String(valor).replace(/\(([\^vp,0-9\.\-]{1,})\)\^([p,0-9\.]{1,})/g,'Math.pow($1,$2)');
		
		// 1 ^ 2
		valor = String(valor).replace(/([vp,0-9\.]{1,})\^([p,0-9\.]{1,})/g,'Math.pow($1,$2)');
		
		
		return valor;
	}
	
	
}



function roundNumber(num, dec) {
	var result = Math.round( Math.round( num * Math.pow( 10, dec + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10,dec);
	return result;
}

function mudarEscala(xMin,xMax,yMin,yMax){
	var applet = document.ggbApplet;
	
	
	stringXML = applet.getXML();

	// Converte a string para um documento XML
	try //Internet Explorer
	  {
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.loadXML(stringXML);
	  }
	catch(e)
	  {
	  try //Firefox, Mozilla, Opera, etc.
	    {
	    parser=new DOMParser();
	    xmlDoc=parser.parseFromString(stringXML,"text/xml");
	    }
	  catch(e) {alert(e.message)}
	  }



	x=xmlDoc.getElementsByTagName("euclidianView")[0];

	if (x.getElementsByTagName("size")[0]!=undefined) {
		var sizeX = x.getElementsByTagName("size")[0].getAttribute('width');
		var sizeY = x.getElementsByTagName("size")[0].getAttribute('height');
//		console.log('size do ggb',sizeX,sizeY);
	} 
	else
	{
		var sizeX = Number(applet.width)-2;
		var sizeY = Number(applet.height)-2;
//		console.log('size do applet',sizeX,sizeY);
	}

	
	var escalaX = sizeX/(xMax-xMin);
	var escalaY = sizeY/(yMax-yMin);
	var zeroX = -1*xMin*escalaX;
	var zeroY = Number(sizeY) + Number(yMin*escalaY);
		
	
	x.getElementsByTagName("coordSystem")[0].setAttribute('scale',escalaX);
	x.getElementsByTagName("coordSystem")[0].setAttribute('yscale',escalaY);
	x.getElementsByTagName("coordSystem")[0].setAttribute('xZero',zeroX);
	x.getElementsByTagName("coordSystem")[0].setAttribute('yZero',zeroY);


	 applet.setXML(xml2Str(xmlDoc)) ;
	 applet.refreshViews();
	 
}
