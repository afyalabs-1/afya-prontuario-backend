# Time que a Afya Gama (Back-end) 


### Descrição Geral

##### :dart: Objetivo

O sistema de gerenciamento de consultórios AfyaGama é capaz de controlar o cadastro de seus clientes, atendimentos e o histórico de prontuário dos clientes/pacientes.
O sistema back-end, você deve ser capaz de cadastrar e manipular dados que serão consumidos pela  [interface do Front-end](https://o-time-que-a-afya-gama.vercel.app/login) através dos endpoints que podem ser encontrados na [documentação do swagger](https://afya-challenge.herokuapp.com/api-docs/). 

##### :computer: Equipe de desenvolvimento
- Frontend/UX: [Bianca Castanheira](https://github.com/BiancaCastanheira) e [Melissa Augusto Ribeiro](https://github.com/melissarib)
- Back-end: [Alex Felipe Barbosa](https://github.com/AlexFelipeBarbosa), [Felipe Henrique Fernandes Andrade](https://github.com/fellipehfa) e [Robson Lourenço](https://github.com/robinhosl2008)

##### :octocat: Tecnologias utilizadas
A intenção é utilizar stacks que ajudem na escalabilidade do projeto como um todo e que também facilite o desenvolvimento. Por tanto, foram escolhidos as seguintes stacks:
- NodeJS + Express: tecnologias perfeitas para este caso, pois o npm é um dos maiores repositórios de software que existe (se não o maior), sendo assim, com maior flexibilidade de integração.
- Typescript: o Typescript ajuda no desenvolvimento com sua intellisense da IDE, o que auxilia à consertar pequenos erros sem precisar de um console de depuração, apenas para casos mais específicos
- TypeORM:  Chegamos a conclusão que o TypeORM nos forneceria um leque de possíveis conexões e com uma documentação bem completa.
- Docker + Docker-compose: por se tratar de um projeto desenvolvido em cinco pessoas, optamos por utilizar o Docker e Docker-Compouse, para criar uma ambiente de desenvolvimento igual para todos, evitando assim qualquer problemas com ambiente de terceiros.
- Jest: para os testes unitários escolhemos o Jest pela documentação e integração com o Typescript.
- Postgres + Heroku: O postgres além de ter uma grande variedade de tipagem de dados, possibilita a relação entre as tabelas.

##### :memo: Funcionalidades 
- [x] Realização do Cadastro de Clientes 
- [x] Realização de Cadastro de Especialistas.
- [x] Realização de registro de atendimentos 
- [x] Exibição de histórico em prontuários de cada atendimento realizado.
- [x] Busca de atendimento por data de agendamento, data atendimento, cliente, especialista e status.


### Instruções de Uso

Para clonar projeto em seu computador, use o seguinte comando:

    git clone https://github.com/afyalabs-1/afya-prontuario-brackend.git
        


Caso não tenha o docker compose, instale pela linha de comando a seguir:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


Você vai precisar gerenciar o banco de dados, caso não tenha ferramenta pra isso, indicamos o DBeaver, é bem simples de usar.

https://dbeaver.io/
    

Instale as dependências utilizadas.

    npm install
        
A criação das tabelas do banco de dados é feita pelas migrantions, para rodar as migrations basta rodar o código abaixo enquanto o servidor estiver rodando.

    npm run typeorm migration:run


