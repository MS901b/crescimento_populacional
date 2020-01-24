var SalvaLocalLoaded = false;
var GGBLoaded = false;
var HTMLLoaded = false;

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
    setAtividade('atividade_1', 2, false); //Comecou a fazer a atividade_1

    switch (PosicaoAtual.Parte) {
        case 0: //Parte1
            break;

        case 1: //Parte2
            /* Traz respostas do aluno */
            $('parte2_q1_a').value = valida(getResp('atividade1_parte2_q1_a'));
            Event.observe('parte2_q1_a', 'change', function(evento) {
                setResp('atividade1_parte2_q1_a', $('parte2_q1_a').value);
            });

            $('parte2_q1_b').value = valida(getResp('atividade1_parte2_q1_b'));
            Event.observe('parte2_q1_b', 'change', function(evento) {
                setResp('atividade1_parte2_q1_b', $('parte2_q1_b').value);
            });

            $('parte2_q1_c').value = valida(getResp('atividade1_parte2_q1_c'));
            Event.observe('parte2_q1_c', 'change', function(evento) {
                setResp('atividade1_parte2_q1_c', $('parte2_q1_c').value);
            });

            $('parte2_q2_a').value = valida(getResp('atividade1_parte2_q2_a'));
            Event.observe('parte2_q2_a', 'change', function(evento) {
                setResp('atividade1_parte2_q2_a', $('parte2_q2_a').value);
            });

            break;

        case 2: //Parte3
            $('parte3_q3_a').value = valida(getResp('atividade1_parte3_q3_a'));
            Event.observe('parte3_q3_a', 'change', function(evento) {
                setResp('atividade1_parte3_q3_a', $('parte3_q3_a').value);
            });

            $('parte3_q3_b').value = valida(getResp('atividade1_parte3_q3_b'));
            Event.observe('parte3_q3_b', 'change', function(evento) {
                setResp('atividade1_parte3_q3_b', $('parte3_q3_b').value);
            });

            $('parte3_q4_a').value = valida(getResp('atividade1_parte3_q4_a'));
            Event.observe('parte3_q4_a', 'change', function(evento) {
                setResp('atividade1_parte3_q4_a', $('parte3_q4_a').value);
            });

            $('parte3_q4_b').value = valida(getResp('atividade1_parte3_q4_b'));
            Event.observe('parte3_q4_b', 'change', function(evento) {
                setResp('atividade1_parte3_q4_b', $('parte3_q4_b').value);
            });

            $('parte3_q4_c').value = valida(getResp('atividade1_parte3_q4_c'));
            Event.observe('parte3_q4_c', 'change', function(evento) {
                setResp('atividade1_parte3_q4_c', $('parte3_q4_c').value);
            });

            break;

        case 3: //Parte4
            $('parte4_q5_a').value = valida(getResp('atividade1_parte4_q5_a'));
            Event.observe('parte4_q5_a', 'change', function(evento) {
                setResp('atividade1_parte4_q5_a', $('parte4_q5_a').value);
            });

            $('parte4_q5_b').value = valida(getResp('atividade1_parte4_q5_b'));
            Event.observe('parte4_q5_b', 'change', function(evento) {
                setResp('atividade1_parte4_q5_b', $('parte4_q5_b').value);
            });

            $('parte4_q5_c').value = valida(getResp('atividade1_parte4_q5_c'));
            Event.observe('parte4_q5_c', 'change', function(evento) {
                setResp('atividade1_parte4_q5_c', $('parte4_q5_c').value);
            });
            break;

        default: //Parte5
            $('parte5_q6_a').value = valida(getResp('atividade1_parte5_q6_a'));
            Event.observe('parte5_q6_a', 'change', function(evento) {
                setResp('atividade1_parte5_q6_a', $('parte5_q6_a').value);
            });

            $('parte5_q6_b').value = valida(getResp('atividade1_parte5_q6_b'));
            Event.observe('parte5_q6_b', 'change', function(evento) {
                setResp('atividade1_parte5_q6_b', $('parte5_q6_b').value);
            });

            $('parte5_q6_c').value = valida(getResp('atividade1_parte5_q6_c'));
            Event.observe('parte5_q6_c', 'change', function(evento) {
                setResp('atividade1_parte5_q6_c', $('parte5_q6_c').value);
            });
            break;
    }

}

function tudoCerto() {
    if (PosicaoAtual.Parte == 4) { //Ultima parte
        setAtividade('atividade_1', 3, true); //atividade_1 estah feita
    }
}

/************
 * Correcao *
 ************/
function corrige_q_1_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    if (Math.abs(valor[0] - 100000 * 1.8) < 0.01) {
        applet.setVisible('q1a', true);
        return [true];
    } else {
        applet.setVisible('q1a', false);
    }
    return [false];
}

function corrige_q_1_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    if (Math.abs(valor[0] - 100000 * Math.pow(1.8, 2)) < 0.01) {
        applet.setVisible('q1b', true);
        return [true];
    } else {
        applet.setVisible('q1b', false);
    }
    return [false];
}

function corrige_q_1_c(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    var applet = document.ggbApplet;
    if (Math.abs(valor[0] - 100000 * Math.pow(1.8, 3)) < 0.01) {
        applet.setVisible('q1c', true);
        return [true];
    } else {
        applet.setVisible('q1c', false);
    }
    return [false];
}

function corrige_q_2(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = valor[0].replace(/n/gi, 'x');
    //alert(verificaFuncao(valor[0]));
    if (verificaFuncao(valor[0])) {
        var applet = document.ggbApplet;
        if (compararFuncao(valor[0], '100000*1.8^x')) {
            applet.setVisible('lista1', true);
            return [true];
        } else {
            applet.setVisible('lista1', false);
        }
    }

    return [false];
}

function corrige_q_3_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [Math.abs(valor[0] - 1890) < 50];
}

function corrige_q_3_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [Math.abs(valor[0] - 100 * Math.pow(1.8, 7)) < 50];
}

function corrige_q_4_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 3 && valor[0] <= 3.1)];
}

function corrige_q_4_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 0.9 && valor[0] <= 1.1)];
}

function corrige_q_4_c(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 0.6 && valor[0] <= 0.8)];
}

function corrige_q_5_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 2.3 && valor[0] <= 2.5)];
}

function corrige_q_5_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 2.3 && valor[0] <= 2.5)];
}

function corrige_q_5_c(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [(valor[0] >= 2.3 && valor[0] <= 2.5)];
}

function corrige_q_6_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [Math.abs(valor[0] - 0.8) < 0.1];
}

function corrige_q_6_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [Math.abs(valor[0] - 0.8) < 0.1];
}

function corrige_q_6_c(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaExpressaoParenteses(valor[0]);
    return [Math.abs(valor[0] - 0.8) < 0.1];
}