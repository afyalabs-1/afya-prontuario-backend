# Instruções de Uso

## Docker
Caso não tenha o docker compose, instale pela linha de comando a seguir:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

Você vai precisar gerenciar o banco de dados, caso não tenha ferramenta pra isso, eu indico o DBeaver, é bem simples de usar

https://dbeaver.io/

Se tiver duvidas de como executar fazer as conexões me chama que eu auxilio.
## Para iniciar a aplicação:

**IMPORTANTE**: Execute os códigos abaixo em sequencia.

Para instalar as dependências:

    yarn

Para começar o desenvolvimento execute o comando a seguir, irá demorar um pouco, esse comando vai buildar todo projeto, criar um container postgres e rodar o servidor.

     docker-compose up

O comando acima só precisa ser rodado uma vez, para as próximas vezes, basta rodar:

    yarn dev

  No console deve aparecer o log:

    Server's running!⚡⚡⚡

Consulte o banco de dados, verifique se foi incluído uma nova tabela de `Client`
