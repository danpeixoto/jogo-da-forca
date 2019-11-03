# Backend Jogo da Forca [![Codacy Badge](https://api.codacy.com/project/badge/Grade/abf64262d16f43229a6ed422a3bea136)](https://www.codacy.com/manual/Pextre/jogo-da-forca?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Pextre/jogo-da-forca&amp;utm_campaign=Badge_Grade)

## Pré-requisitos
Para conseguir rodar os códigos typescript é necessario instalá-lo. Segue o link de instalação [typescript](http://www.typescriptlang.org/).

Também é necessário ter o nodejs instalado em sua máquina, ele possibilita a execução de codigo JS fora do navegadores. Segue o link de instalação [nodejs](https://nodejs.org/).
## Inicialização
**Após fazer download do projeto é necessário executar os seguintes comandos:**

O comando npm ira baixar todos as bibliotecas utilizadas no projeto que estão presentes no package.json.
```
npm
```

Para transforma o código .ts em .js é necessario utilizar o comando abaixo. O argumento '-w' serve para ele ficar ouvindo modificações no código e transpilar automaticamente. Esses arquivos serão criados dentro do diretório '/dist' que sera gerado quando o comando for executado.
```
tsc -w
```

Após a transpilação do código typescript é necessario inicialiar o servidor para que ele comece a escutar. Esse servidor foi definido para rodar na url http://localhost:3001.
```
nodemon /dist/main.js
```

**Agora o servidor deve estar rodando.**

## Acesso
**O acesso a API é feito através de requisições HTTP padrões, e elas são:**

### GET
**Retorna informações.**

URL:
```
http://localhost:3001/words
```
```
http://localhost:3001/word
```
```
http://localhost:3001/players
```
```
http://localhost:3001/players/:nickname
```
```
http://localhost:3001/competitions
```
```
http://localhost:3001/competitions/:difficulty
```
### POST
**Salva informações.**

```
http://localhost:3001/words
```
```
http://localhost:3001/players
```
```
http://localhost:3001/competitions
```

### PUT
**Altera informações.**

```
http://localhost:3001/words/:id
```
```
http://localhost:3001/players/:id
```
```
http://localhost:3001/competitions/:difficulty
```
