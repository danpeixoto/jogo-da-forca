import * as restify from 'restify';
import { Router } from '../common/router';
import { Word } from './word.model';

//Classe responsável pelo roteamento das rotas relacionadas com as Palavras.
class WordRouter extends Router {
    constructor() {
        super();
    }

    //Esse método aplica os métodos do HTTP: POST, GET, PUT
    applyRoutes(application: restify.Server) {
        //application.método(url,(request,response,next)){...}

        //Retorna como resposta todas as palavras presentes no DB
        application.get('/words', (req, res, next) => {

            Word.find().then(words => {

                res.json(words);
                return next();

            }).catch(next);

        });

        //Retorna como resposta uma palavra aleatória
        application.get('/word', (req, res, next) => {

            Word.countDocuments({}).then(result => {

                const random = Math.floor(Math.random() * result)
                return Word.findOne().skip(random);

            }).then(word => {

                res.json(word);
                return next();

            }).catch(next);

        });

        //Recebe pelo corpo da requisição informações necessárias para a criação de um novo documento
        //Retorna como resposta o documento criado
        application.post('/words', (req, res, next) => {

            const word = new Word(req.body);
            word.save().then(newWord => {

                res.json(newWord);
                return next();

            }).catch(next)

        });

        //Recebe pelo parametro da url o id da palavra e pelo corpo da requisição as informações que serão alteradas
        //Retorna como resposta a palavra alterada
        application.put('/words/:id', (req, res, next) => {

            const options = { overwrite: false }
            Word.update({ _id: req.params.id }, req.body, options).exec()
                .then(result => {

                    if (result.n) {
                        return Word.findById(req.params.id);
                    } else {
                        res.send(404);
                        throw new Error('Word not found.');
                    }

                }).then(word => {

                    res.json(word);
                    return next()

                }).catch(next);

        })

    }
}

export const wordRouter = new WordRouter();
