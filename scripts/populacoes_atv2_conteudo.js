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
                enunciadoGeral: 'Veja que os pontos no gráfico sugerem uma função relativamente simples, uma reta. Repare que os pontos sugerem uma reta decrescente e movimentando os dois <a id="ponto_azul">“x” azuis</a> vamos obter uma reta que nos ajude a prever os próximos valores de P(n) e R(n).',
                itens: [{ //A
                    tipo: 'instrucao',
                    corrigir: corrige_q_1_a,
                    selecionada: selecionou_q1,
                    enunciado: 'Posicione a reta de tal modo que o <a id="erro">erro</a> seja menor do que 0,05.',
                    msgErro: 'A reta não precisa passar exatamente por todos os pontos, deve apenas se posicionar de tal modo que represente bem a tendência sugerida por eles.'
                }]
            }
        },
        { //Parte 3
            parte3_q2: //Questão 2
            {
                enunciadoGeral: '',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_2_a,
                        enunciado: 'Use o gráfico ao lado para obter o valor de R(4), sabendo que P(4)=289.',
                        msgErro: 'Movimente o ponto azul até a posição correspondente à população igual a 289.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_2_b,
                        enunciado: 'Use o valor de R(4) e P(4) para calcular P(5).',
                        msgErro: 'Lembre-se de que R(4) = (P(5)-P(4))/P(4).'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_2_c,
                        enunciado: 'Use o gráfico, ao lado, e a resposta do item anterior para obter o valor de R(5)?',
                        msgErro: 'Movimente o ponto azul até a posição correspondente à população que você calculou no item B.'
                    },
                    { //D
                        tipo: 'input',
                        corrigir: corrige_q_2_d,
                        enunciado: 'Use o valor de R(5) para calcular P(6).',
                        msgAjuda: 'Lembre-se que R(n) = (P(n+1)-P(n))/P(n).',
                        msgErro: 'Lembre-se que R(5) = (P(6)-P(5))/P(5).'
                    }
                ]
            }
        },
        { //Parte 4
            parte4_q3: //Questão 3
            {
                enunciadoGeral: '',
                itens: [{ //A
                        tipo: 'input',
                        corrigir: corrige_q_3_a,
                        enunciado: 'Qual é o valor de P(8)?',
                        msgErro: 'Movimente o ponto azul até a posição relativa ao ponto P(8) e veja a sua coordenada X.'
                    },
                    { //B
                        tipo: 'input',
                        corrigir: corrige_q_3_b,
                        enunciado: 'Qual é o valor de R(8)?',
                        msgErro: 'Movimente o ponto azul até a posição relativa ao ponto P(8) e veja a sua coordenada Y.'
                    },
                    { //C
                        tipo: 'input',
                        corrigir: corrige_q_3_c,
                        enunciado: 'Qual é o valor de P(9)?',
                        msgErro: 'Movimente o ponto azul até a posição relativa ao ponto P(9) e veja a sua coordenada X.'
                    },
                    { //D
                        tipo: 'input',
                        corrigir: corrige_q_3_d,
                        enunciado: 'Qual é o valor de R(9)?',
                        msgErro: 'Movimente o ponto azul até a posição relativa ao ponto P(9) e veja a sua coordenada Y.'
                    }
                ]
            },
            parte4_q4: //Questão 4
            {
                enunciadoGeral: '',
                itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_4_a,
                    enunciado: 'Qual é o valor de P(n) quando R(n)=0?',
                    msgErro: 'Use a equação da reta para encontrar o valor de x quando y=0.'
                }]
            }
        },
        { //Parte 5
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
    MeuBloco[0] = 'Tabela';
    MeuBloco[1] = [
        [{ value: 'n', largura: 4 }, { value: 'P(n) em milhares', largura: 4 }, { value: 'R(n)', largura: 4 }], //header
        [{ value: '0', tipo: 'texto' }, { value: '50', tipo: 'texto' }, { value: '0,63', tipo: 'texto' }],
        [{ value: '1', tipo: 'texto' }, { value: '81', tipo: 'texto' }, { value: '0,57', tipo: 'texto' }],
        [{ value: '2', tipo: 'texto' }, { value: '129', tipo: 'texto' }, { value: '0,53', tipo: 'texto' }],
        [{ value: '3', tipo: 'texto' }, { value: '196', tipo: 'texto' }, { value: '0,48', tipo: 'texto' }],
        [{ value: '4', tipo: 'texto' }, { value: '289', tipo: 'texto' }, { value: ' ', tipo: 'texto' }]
    ];

});