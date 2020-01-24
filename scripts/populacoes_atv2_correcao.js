var SalvaLocalLoaded = false;
var GGBLoaded = false;
var HTMLLoaded = false;
/* Variaveis globais para setar o zoom do applet. Os valores foram pegos diretos do applet. */
var xMin = -35.99547;
var yMin = -0.07335;
var yMax = 1.22058;


document.observe('dom:safeLoaded', function(ev) {
    HTMLLoaded = true;
    SalvaLocalLoaded = true;

    /* exemplo de como habilitar as partes 
       tem que lembrar de comentar este trecho pro software oficial */
    /*   for(var b = 0; b < Partes.length; b++) {
    		$('SalvaLocal').Salva(nomeSoft, 'automacao_atividade_'+PosicaoAtual.Atividade+'_parte_'+b, '2');
    	}
    */

    checkInits();
});

function ggbOnInit() {
    GGBLoaded = true;
    checkInits();
}

function checkInits() {
    if (PosicaoAtual.Parte == 0) {
        GGBLoaded = true;
    }
    // Checagem se tanto SalvaLocal e Geogebra foram carregados.
    if (SalvaLocalLoaded && GGBLoaded && HTMLLoaded) InitOnLoad();
}

function InitOnLoad() {
    setAtividade('atividade_2', 2, false); //Comecou a fazer a atividade_2

    switch (PosicaoAtual.Parte) {
        case 0: //Parte1
            break;

        case 1: //Parte2
            break;

        case 2: //Parte3
            setaReta();
            setaLimiteCoordX();

            $('parte3_q2_a').value = valida(getResp('atividade1_parte3_q2_a'));
            Event.observe('parte3_q2_a', 'change', function(evento) {
                setResp('atividade1_parte3_q2_a', $('parte3_q2_a').value);
            });

            $('parte3_q2_b').value = valida(getResp('atividade1_parte3_q2_b'));
            Event.observe('parte3_q2_b', 'change', function(evento) {
                setResp('atividade1_parte3_q2_b', $('parte3_q2_b').value);
            });

            $('parte3_q2_c').value = valida(getResp('atividade1_parte3_q2_c'));
            Event.observe('parte3_q2_c', 'change', function(evento) {
                setResp('atividade1_parte3_q2_c', $('parte3_q2_c').value);
            });

            $('parte3_q2_d').value = valida(getResp('atividade1_parte3_q2_d'));
            Event.observe('parte3_q2_d', 'change', function(evento) {
                setResp('atividade1_parte3_q2_d', $('parte3_q2_d').value);
            });
            break;

        case 3: //Parte4
            setaReta();
            setaLimiteCoordX();
            setaPontos();
            salvaDadosPontos();

            $('parte4_q3_a').value = valida(getResp('atividade1_parte4_q3_a'));
            Event.observe('parte4_q3_a', 'change', function(evento) {
                setResp('atividade1_parte4_q3_a', $('parte4_q3_a').value);
            });

            $('parte4_q3_b').value = valida(getResp('atividade1_parte4_q3_b'));
            Event.observe('parte4_q3_b', 'change', function(evento) {
                setResp('atividade1_parte4_q3_b', $('parte4_q3_b').value);
            });

            $('parte4_q3_c').value = valida(getResp('atividade1_parte4_q3_c'));
            Event.observe('parte4_q3_c', 'change', function(evento) {
                setResp('atividade1_parte4_q3_c', $('parte4_q3_c').value);
            });

            $('parte4_q3_d').value = valida(getResp('atividade1_parte4_q3_d'));
            Event.observe('parte4_q3_d', 'change', function(evento) {
                setResp('atividade1_parte4_q3_d', $('parte4_q3_d').value);
            });

            $('parte4_q4_a').value = valida(getResp('atividade1_parte4_q4_a'));
            Event.observe('parte4_q4_a', 'change', function(evento) {
                setResp('atividade1_parte4_q4_a', $('parte4_q4_a').value);
            });
            break;

        default: //Parte5
            initParte5();
            break;
    }

}

function tudoCerto() {}

/*****************
 * Inicializacao *
 *****************/
function initParte5() {
    var applet = document.ggbApplet;

    applet.setCoords('P_5', 5, parseFloat(getResp('respB')));
    applet.setFixed('P_5', true);

    applet.setCoords('P_6', 6, parseFloat(getResp('P_6')));
    applet.setFixed('P_6', true);

    applet.setCoords('P_7', 7, parseFloat(getResp('P_7')));
    applet.setFixed('P_7', true);

    applet.setCoords('P_8', 8, parseFloat(getResp('P_8')));
    applet.setFixed('P_8', true);

    applet.setCoords('P_9', 9, parseFloat(getResp('P_9')));
    applet.setFixed('P_9', true);

    applet.setCoords('raiz', 0, parseFloat(getResp('raiz')));

    setAtividade('atividade_2', 3, true); //atividade_2 estah feita
}

function setaPontos() {
    var applet = document.ggbApplet;
    applet.evalCommand('P_4 = (289,' + parseFloat(getResp('respA')) + ')');
    applet.setFixed('P_4', true);
    applet.evalCommand('P_5 = (' + parseFloat(getResp('respB')) + ',' + parseFloat(getResp('respC')) + ')');
    applet.setFixed('P_5', true);
}

function setaReta() {
    var equacao = getResp('equacao_f');
    var applet = document.ggbApplet;
    applet.setFixed('f', false);
    applet.evalCommand(equacao);
    applet.setVisible('f', true);
    applet.setFixed('f', true);
}

function setaLimiteCoordX() {
    var applet = document.ggbApplet;
    var xMax = applet.getXcoord('Q');
    xMax += 50;
    mudarEscala(xMin, xMax, yMin, yMax);
}

function salvaDadosPontos() {
    var applet = document.ggbApplet;
    setResp('P_6', applet.getXcoord('P_6'));
    setResp('P_7', applet.getXcoord('P_7'));
    setResp('P_8', applet.getXcoord('P_8'));
    setResp('P_9', applet.getXcoord('P_9'));
}

/**********************
 * Selecionou questao *
 **********************/
function selecionou_q1() {
    var applet = document.ggbApplet;
    //applet.setVisible('b',true);
    applet.setValue('visivel', 1);
}

/************
 * Correcao *
 ************/
function corrige_q_1_a(valor) {
    var applet = document.ggbApplet;
    var equacao = applet.getValueString('b'); //b: y = -0.00633x + 1.38153
    //alert(equacao);
    equacao = equacao.replace('b: ', '');
    equacao = equacao.replace('y', 'f(x)');
    //alert(equacao);
    if (applet.getValue('soma') < 0.05) {
        setResp('equacao_f', equacao);
        return [true];
    }
    return [false];
}

function corrige_q_2_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var f289 = applet.getValue('resp2a');
    if (Math.abs(valor[0] - f289) < 0.02) {
        setResp('respA', valor[0]);
        applet.setFixed('P_4', false);
        applet.evalCommand('P_4 = (289,' + valor[0] + ')');
        applet.setVisible('P_4', true);
        applet.setFixed('P_4', true);
        return [true];
    }

    applet.setVisible('P_4', false);
    return [false];

}

function corrige_q_2_b(valor) {
    //calcule com %P(4) = (P(5)-P(4))/P(4), ou seja, respostaItemA=(respostaEsperada-289)/289 com margem de +-10
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var respA = parseFloat(getResp('respA'));
    var respB = (respA * 289) + 289;

    if (Math.abs(valor[0] - respB) < 10) {
        setResp('respB', respB);
        return [true];
    }
    return [false];
}

function corrige_q_2_c(valor) {
    //calcule f(respostaItemB) no geogebra e d� margem de 0,02
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var respB = parseFloat(getResp('respB'));
    var applet = document.ggbApplet;
    applet.evalCommand('respC = f(' + respB + ')');
    var respC = applet.getValue('respC');
    if (Math.abs(valor[0] - respC) < 0.02) {
        setResp('respC', valor[0]);
        applet.setFixed('P_5', false);
        applet.evalCommand('P_5 = (' + respB + ',' + valor[0] + ')');
        applet.setVisible('P_5', true);
        applet.setFixed('P_5', true);
        return [true];
    }
    applet.setVisible('P_5', false);
    return [false];
}

function corrige_q_2_d(valor) {
    //calcule com %P(5) = (P(6)-P(5))/P(5), ou seja, respostaItemC=(respostaEsperada-respostaItemB)/ respostaItemB com margem de +-10
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var respC = parseFloat(getResp('respC'));
    var respB = parseFloat(getResp('respB'));
    var respD = (respC * respB) + respB;

    return [Math.abs(valor[0] - respD) < 10];
}

function corrige_q_3_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var resp = applet.getXcoord('P_8');

    return [Math.abs(resp - valor[0]) < 10];
}

function corrige_q_3_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var resp = applet.getYcoord('P_8');

    return [Math.abs(resp - valor[0]) < 0.02];
}

function corrige_q_3_c(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var resp = applet.getXcoord('P_9');

    return [Math.abs(resp - valor[0]) < 10];
}

function corrige_q_3_d(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var resp = applet.getYcoord('P_9');

    return [Math.abs(resp - valor[0]) < 0.02];
}

function corrige_q_4_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    var resp = applet.getXcoord('raiz');
    if (Math.abs(resp - valor[0]) < 10) {
        setResp('raiz', resp);
        return [true];
    }
    return [false];
}