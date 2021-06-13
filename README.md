# Instruções de Uso

## Docker
Caso não tenha o docker compose, instale pela linha de comando a seguir:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

Você vai precisar gerenciar o banco de dados, caso não tenha ferramenta pra isso, indicamos o DBeaver, é bem simples de usar

https://dbeaver.io/

## Para iniciar a aplicação:

**IMPORTANTE**: Execute os códigos abaixo em sequência.

Para instalar as dependências:

    yarn

Para começar o desenvolvimento, execute o comando a seguir. Irá demorar um pouco pois esse comando vai buildar todo projeto, criar um container postgres e rodar o servidor.

     docker-compose up      

O comando acima só precisa ser rodado uma vez. Para as próximas vezes, basta utilizar:

    yarn dev

  No console deve aparecer o log:

    Server's running!⚡⚡⚡

Consulte o banco de dados, verifique se foi includo uma nova tabela de `Client`
