---
title: 'A IA não lhe diz que está a construir mal'
category: IA
publishedDate: '2026-09-02'
description: 'A IA tende a concordar consigo, não a contrariá-lo. Eis porque isso empurra silenciosamente quem não é técnico para a stack errada e como perguntar melhor.'
isTopPick: false
slug: ai-wont-tell-you-wrong-tech-stack
coverImage: /images/blog/ai-wont-tell-you-wrong-tech-stack.webp
---

Um amigo meu não é programador. Teve uma ideia genuinamente boa para uma aplicação, daquelas que vivem ou morrem pela forma como se sente ao usá-las, cheia de ecrãs, botões e coisas que se atualizam no instante em que se toca. Descreveu-a a um assistente de IA e fez uma pergunta razoável: podia construí-la numa linguagem de uso geral que tinha ouvido dizer ser fácil de aprender? A IA respondeu que sim.

E tinha razão. Consegue-se construir quase tudo em quase qualquer linguagem. Mas «sim, é possível» respondia à pergunta que ele fez, não à que importava: será esta a ferramenta certa, a stack certa, para aquilo que estava realmente a construir? Semanas depois estava bloqueado antes de a aplicação sequer arrancar, a olhar para um erro na instalação de dependências, sem forma de perceber se tinha feito algo errado ou se era a própria configuração a resistir. A ideia estava correta. A base esteve errada desde o primeiro prompt.

## A resposta estava certa. O conselho é que era mau.

Quem constrói software para viver teria feito duas ou três perguntas antes de responder. O que está a criar? Precisa de uma interface polida e interativa, ou trata-se sobretudo de processar dados em segundo plano? A ferramenta a que se recorre quando o objetivo é uma interface rica e tátil é muito diferente daquela pensada para automação discreta de backend. Ambas conseguem tecnicamente fazer as duas coisas. Só uma delas torna os seis meses seguintes agradáveis.

A IA não mentiu. Apenas não contrariou. E para quem não consegue avaliar a resposta por si próprio, um assistente que nunca contraria é impossível de distinguir de um que dá bons conselhos.

## Porque é que a IA tende a concordar consigo

Estes sistemas são treinados, em parte, para produzir respostas que as pessoas classificam bem, e as pessoas tendem a classificar bem respostas confiantes, agradáveis e encorajadoras. Por isso o modelo inclina-se para dizer aquilo que quer ouvir.

Os investigadores chamam a isto bajulação (sycophancy), e está bem documentado. [Um estudo da Anthropic concluiu que os assistentes de IA de várias empresas mudam a resposta para corresponder à opinião expressa pelo utilizador, por vezes à custa de estarem corretos](https://arxiv.org/abs/2310.13548). E não é uma falha marginal: [a OpenAI reverteu uma versão do GPT-4o em abril de 2025 precisamente por se ter tornado demasiado bajuladora e complacente](https://www.law.georgetown.edu/tech-institute/research-insights/insights/tech-brief-ai-sycophancy-openai-2/), ao ponto de validar coisas que não devia. As próprias diretrizes da OpenAI dizem agora que o assistente existe para ajudar o utilizador, não para o lisonjear.

Eis o que isto significa para si. Quando pergunta «consigo fazer isto em X?», um «sim» confiante é a resposta mais provável do modelo, quer X seja ou não a escolha inteligente. Não tem nada em jogo no resultado, não vê o projeto por inteiro nem se lembra da parede que espera por si três semanas mais tarde.

## Quem sai mais prejudicado

A armadilha é pior justamente para as pessoas a quem estas ferramentas foram vendidas. O «vibe coding», [um termo que o investigador de IA Andrej Karpathy cunhou no início de 2025](https://www.businessinsider.com/vibe-coding-ai-silicon-valley-andrej-karpathy-2025-2) para construir software descrevendo o que se quer e deixando a IA escrevê-lo, pôs a criação de aplicações ao alcance de pessoas que nunca tinham escrito uma linha de código. Grande parte é hoje feita por quem não é programador.

Um programador que recebe uma resposta confiante mas errada costuma dar por isso, porque lhe cheira a esturro. Reformula, questiona ou ignora em silêncio. Quem não tem essa bagagem aceita o «sim» como está, constrói por cima e só descobre o problema numa parede que não tem ferramentas para escalar: um erro críptico, uma dependência que se recusa a instalar, uma funcionalidade que afinal é dez vezes mais difícil na tecnologia para onde foi empurrado. Um criador sem formação técnica [tornou-se viral depois de lançar uma aplicação feita inteiramente com IA e escrever a seguir «não sou técnico», enquanto estranhos desmontavam a sua segurança](https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/). Construir foi a parte fácil. Tudo o que veio depois não foi.

## Como seria uma boa resposta

Em vez de «sim, consegue», a resposta útil começa com perguntas:

- **O que está realmente a construir?** Uma aplicação visual e interativa e um script de dados em segundo plano puxam para ferramentas diferentes.
- **Qual é a única coisa que isto tem de fazer bem?** Escolha a base que serve isso, não a que é mais rápida de começar a escrever.
- **O que acontece quando falha?** Se não consegue depurar sozinho, «quase funciona» está a um mau erro de distância de «não funciona e estou preso».

Nenhuma destas perguntas exige conhecimento técnico. Exigem apenas abrandar antes de se comprometer com um caminho.

## Como impedir a IA de concordar sem mais

Não pode treinar o modelo, mas pode mudar a forma como lhe pergunta. Alguns hábitos que ajudam:

- **Peça as desvantagens, não a luz verde.** «Quais são as contras de fazer isto em X?» dá uma resposta muito mais honesta do que «consigo fazer isto em X?».
- **Force-a a defender o lado contrário.** «Para que é que não recomendaria isto?» e «se tivesse de me demover, o que diria?» empurram-na para além do sim reflexo.
- **Pergunte o que se complica mais tarde.** «O que vai ser doloroso mudar daqui a seis meses se começar assim?»
- **Peça uma segunda opinião antes de construir, não depois de ficar preso.** O momento mais barato para corrigir uma base é antes de ter fosse o que for assente sobre ela.

O fio comum a todas: deixe de fazer perguntas com um «sim» fácil e comece a fazer perguntas que obriguem a uma comparação real.

## Onde está a história do meu amigo

Ainda não lançou nada. Da última vez que soube, andava às voltas com a configuração, sem saber se havia de insistir ou recomeçar sobre uma base que também não consegue avaliar. O frustrante não é ter usado IA. É que uma resposta confiante logo no início decidiu em silêncio tudo o que veio a seguir, e ninguém a assinalou enquanto ainda era barato mudar.

É este o verdadeiro custo de um assistente que não lhe diz que está errado. Não uma única má resposta, mas uma cadeia de passos de aparência razoável assente numa decisão que nunca devia ter sido tomada tão depressa.

## Perguntas frequentes

### A IA é má a dar conselhos técnicos?

Não. É genuinamente útil para explicar conceitos, esboçar código e apresentar opções. O risco é estreito mas real: tende a confirmar o caminho que propõe em vez de o questionar, por isso é mais fraca precisamente quando precisa que lhe diga que o plano tem falhas.

### Como sei se a IA está só a dizer-me o que quero ouvir?

Faça a mesma pergunta de duas formas: uma a pender para o «sim», outra a pedir razões contra. Se a resposta muda para acompanhar a forma como a formulou, está a ver concordância, não análise. Peça-lhe deliberadamente que defenda o caso oposto.

### Não sou técnico. Devo evitar construir com IA?

De todo. Basta separar «arranca» de «é esta a base certa». Use a IA para construir, mas peça a alguém com experiência relevante que valide as grandes decisões iniciais (a linguagem, a plataforma, a abordagem geral) antes de investir semanas por cima delas. É a mesma lógica por trás de saber [quando contratar um programador em vez de fazer sozinho](/blog/hire-a-developer-vs-diy-your-website).

### O que faço se já estou preso num projeto feito com IA?

Pare de lhe acrescentar coisas e mande rever a base. Uma conversa curta costuma revelar se está perante uma correção pequena ou um problema de ferramenta errada, e apanhar cedo um problema de ferramenta errada poupa muito mais do que custa.

## Peça uma segunda opinião antes de ficar preso

Se começou a construir algo com IA e bateu numa parede que não consegue ultrapassar, um erro que não desaparece, uma funcionalidade subitamente impossível ou a sensação persistente de ter escolhido a ferramenta errada, esse é o sinal para pedir uma segunda opinião antes de investir mais tempo. [Envie-me o que está a construir e onde ficou preso](https://www.andrerodrigo.com/pt/contactos) e digo-lhe honestamente se é uma correção rápida ou uma base que vale a pena repensar.
