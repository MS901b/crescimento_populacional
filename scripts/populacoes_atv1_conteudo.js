/*
	Padronização do ID:
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/

var IdPadrao = [
    ['parte/parte', 'q/questao', '/itemletra', '/subitem'], '_'
];

/*
	Questoes

	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item

	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/
var Partes = ['1', '2', '3', '4', '5'];
var nomeSoft = "populacoes";

var Questoes = [{ //Parte 1
        },
        { //Parte 2
            parte2_q1: //Questão 1
            {
                enunciadoGeral: 'Quantas bactérias essa população terá depois de:',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_1_a,
                        enunciado: '30 minutos:',
                        msgAjuda: 'Você pode usar uma calculadora para te ajudar nos cálculos.',
                        msgErro: 'Basta encontrar 80% de 100000 e somar esse valor à população inicial.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_1_b,
                        enunciado: 'Uma hora:',
                        msgAjuda: 'Você pode usar uma calculadora para te ajudar nos cálculos.',
                        msgErro: 'Aplique mais 80% à resposta do item anterior.'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_1_c,
                        enunciado: 'Uma hora e meia:',
                        msgAjuda: 'Você pode usar uma calculadora para te ajudar nos cálculos.',
                        msgErro: 'Aplique mais 80% à resposta do item anterior.'
                    }
                ]
            },
            parte2_q2: //Questão 2
            {
                enunciadoGeral: '',
                itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_2,
                    antes: 'P(n) =',
                    enunciado: 'Qual é a expressão que fornece o número de indivíduos dessa população de bactérias em função do número n de períodos de 30 minutos?',
                    msgAjuda: 'Use os símbolos de +, -, *, / e ^ para indicar soma subtração, multiplicação e potenciação, respectivamente. Se você indicar os cálculos corretamente, o próprio software realizará as contas pra você.',
                    msgErro: 'Tente encontrar um padrão na maneira como você calculou os valores respondidos na questão 1.'
                }]
            }
        },
        { //Parte 3
            parte3_q3: //Questão 3
            {
                enunciadoGeral: 'Use a ferramenta, ao lado, para responder.',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_3_a,
                        enunciado: 'Quanto vale P(5) (em milhares)?',
                        msgErro: 'Movimente o ponto azul para obter a resposta pedida.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_3_b,
                        enunciado: 'Quanto vale P(7) (em milhares)?',
                        msgErro: 'Movimente o ponto azul para obter a resposta pedida.'
                    }
                ]
            },
            parte3_q4: //Questão 4
            {
                enunciadoGeral: '',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_4_a,
                        enunciado: 'Em que momento a população de bactérias chegará a, aproximadamente, 600 mil?',
                        msgErro: 'Movimente o ponto azul para encontrar a resposta.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_4_b,
                        enunciado: 'Depois de a população de bactérias chegar a  600 mil, quanto tempo será necessário para ela aumentar em mais 500 mil, ou seja, chegar a, aproximadamente, 1100 mil?',
                        msgErro: 'Movimente o ponto azul para encontrar a resposta. Você deve descobrir quanto tempo transcorreu desde que a população atingiu 600 mil indivíduos.'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_4_c,
                        enunciado: 'Após atingir 1100 mil indivíduos, , quanto tempo será necessário para a população aumentar em mais 500 mil, ou seja, a chegar a, aproximadamente, 1600 mil?',
                        msgErro: 'Movimente o ponto azul para encontrar a resposta. Você deve descobrir quanto tempo transcorreu desde que a população atingiu 1100 mil indivíduos.'
                    }
                ]
            }
        },
        { //Parte 4
            parte4_q5: //Questão 5
            {
                enunciadoGeral: '',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_5_a,
                        enunciado: 'Em quanto tempo, a população de bactérias irá quadruplicar em relação à população inicial?',
                        msgAjuda: 'Lembre-se que a população inicial era de 100 mil bactérias.',
                        msgErro: 'Mova o ponto azul até que a população chegue a 400 mil.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_5_b,
                        enunciado: 'Depois de quadruplicar pela primeira vez, quanto tempo será necessário para que a população quadruplique novamente, ou seja, atinja 1600 mil indivíduos?',
                        msgErro: 'Mova o ponto azul até que a população chegue a 1600 mil. Você deve descobrir quanto tempo transcorreu desde que a população atingiu 400 mil indivíduos.'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_5_c,
                        enunciado: 'Para quadruplicar novamente, quanto tempo a mais será preciso?',
                        msgErro: 'Mova o ponto azul até que a população chegue a 6400 mil. Você deve descobrir quanto tempo transcorreu desde que a população atingiu 1600 mil indivíduos.'
                    }
                ]
            }
        },
        { //Parte 5
            parte5_q6: //Questão 6
            {
                enunciadoGeral: 'Usando essa definição e a ferramenta ao lado, calcule:',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_6_a,
                        enunciado: 'R(1)',
                        msgAjuda: 'Use a calculadora se desejar.',
                        msgErro: 'Obtenha os valores de P(2) e P(1) na ferramenta, ao lado, e calcule o que foi pedido usando a definição acima.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_6_b,
                        enunciado: 'R(2)',
                        msgAjuda: 'Use a calculadora se desejar.',
                        msgErro: 'Obtenha os valores de P(3) e P(2) na ferramenta, ao lado, e calcule o que foi pedido usando a definição acima.'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_6_c,
                        enunciado: 'R(5)',
                        msgAjuda: 'Use a calculadora se desejar.',
                        msgErro: 'Obtenha os valores de P(6) e P(5) na ferramenta, ao lado, e calcule o que foi pedido usando a definição acima.'
                    }
                ]
            }
        }
    ]
    /*
    	Bloco de Notas

    	Nesse Array ficam os dados que aparecem no Bloquinho de notas.
    	Se você for na linha 35 do exemplo_correcao.js verá que está sendo criada uma instância
    	de "Blocao", uma classe de bloco de notas que permite tabelas no conteúdo. Se não for
    	usar tabelas no Software, altere para "Bloco". Ambas classes utilizam a variavel global
    	MeuBloco para preencher o seu conteúdo.
    */

var MeuBloco = new Array();

Event.observe(window, 'load', function() {
    BlocoNotas = new Blocao();
});