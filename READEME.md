# Instruções de Uso


## Docker
Primeiro crie uma imagem do Postgres no Docker

     docker pull postgres

   Comando para criar o container
 
     docker run --name postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

Você vai precisar gerenciar o banco de dados, caso não tenha ferramenta pra isso, eu indico o DBeaver, é bem simples de usar

https://dbeaver.io/

Se tiver duvidas de como executar fazer as conexões me chama que eu auxilio.

O docker não cria o banco de dados sozinho, então é necessário fazer isso manualmente. Crie um novo banco de dados com o nome de `afya_db`

## Para iniciar a plicação:

**IMPORTANTE**: Execute os codigos abaixo em sequencia.

Para instalar as dependências:

    yarn

Não será necessário criar as migrations por enquanto, as próprias entitys farão isso por nos por enquanto.

Para rodar o projeto:

    yarn dev

  No console deve aparecer o log:

    Server's running!⚡⚡⚡

Consulte o banco de dados, verifique se foi includo uma nova tabela de `Client`

## Processo de desenvolvimento

Crie a entity conforme o exemplo já existente na pasta `Model`. Todas as classes serão criadas a partir da classe `BaseEntity`, na pasta `_commons`, portanto utilizar `extends` referenciando este arquivo, como no exemplo. Isso porque todas as tabelas terão ID, CreateDate e DeleteDate.

Utilize os validators para estipular as características de cada coluna.

## Duvidas

Chamem a qualquer hora para tirar as duvidas, vou tentar acessar o mais rapido possivel pra auxiliar. Assim que eu for adicionando mais coisa, eu vou mundando aqui também, então sempre olhem aqui se foi alterado algo.

