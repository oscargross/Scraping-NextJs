# Scraping-NextJs - Scraping of private data and sending by whats
Projeto criado a partir do repositório https://github.com/oscargross/Web-Scraping-Whats

Contexto:
	Sistema privado da empresa de software supre as necessidades em todas funções de sua ERP de uma empresa (que trabalho atualmente) no ramo de venda e manutenção de equipamentos. Um dos módulos do ERP consiste do gerenciamento e controle de ordens de serviço, com gestão por meio de status dos equipamentos consertados/reparados, bem como possui outros módulos, como financeiro, comercial, estoque...
	Como estratégia para aumento da movimentação das ordens de serviço (manutenção), além de todo pós venda e alcance da assistência da empresa, se foi necessário um controle de envio de manutenções futuras. Diversos equipamentos recebem indicação de manutenção semestral ou anual, porém o aviso não ocorre. A empresa fornecedora do ERP cria tarefas para os usuários com o nome do cliente final cada vez que um equipamento que necessite dessa manutenção periodica é vendido (assim haverá uma tarefa pendente até completar o prazo, seja semestral ou anual), ou cada vez que um desses modelos de equipamentos tem sua manutenção encerrada/finalizada (haverá também uma tarefa pendente com seu prazo para que a próxima manutenção ocorra)
	
  Objetivo:
	Como o sistema ERP possui apenas tarefas pendentes, o projeto teve inicio para automatizar este envio de aviso de próxima manutenção via What'sApp para os clientes finais receberem a mensagem facilmente, sem consumo de tempo de trabalho a cada vez que os avisos precisarem ser efetuados.
	O projeto consiste em coletar os dados de login no ERP (só podendo assim ser utilizado por usuários dele) e data de inicio e fim das tarefas em que se desejam realizar os avisos. É então realizada a raspagem dos dados com a lib Puppeteer, coletados os dados e com o preenchimentos dos números de contato What'sApp, é realizado o acesso ao Whats, acesso com a leitura do QRcode e envio das mensagem para os contatos raspados.
  
  Arquitetura: Devido as funcionalidades extraordinarias do NextJS, gostaria de praticar algo nele, uma vez também que foi testado em React, porém não foi possível realizar a scraping com o puppeteer no front-end, sendo necessário um back para a coleta de dados e integração com o Whats, sendo com o next consegue o front e back no mesmo endereço, decedi pelo Next.
