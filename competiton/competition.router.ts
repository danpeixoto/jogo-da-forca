import * as restify from 'restify';
import mongoose from 'mongoose';
import { Router } from '../common/router';
import { Competition } from './competition.model';
import { Player } from '../player/player.model';

class CompetitionRouter extends Router {

    constructor() {
        super();
    }

    applyRoutes(application: restify.Server) {

        application.get('/competitions', (req, res, next) => {

            Competition.find().then(competitions => {

                res.json(competitions);
                return next();

            }).catch(next);

        });

        // Retorna pela resposta a competição e todos os documentos dos jogadores nela, ordenados de forma decrescente pelo score
        application.get('/competitions/:difficulty', (req, res, next) => {

            Competition.findOne({ difficulty: req.params.difficulty })
                .then(competition => {

                    return Player.find({
                        _id: { $in: competition.players }
                    }).then(results => {
                        console.log(competition)
                        return { results, competition };
                    });

                }).then(competitionScoreboard => {

                    competitionScoreboard.results.sort((a: Player, b: Player) => {
                        return b.score - a.score;
                    });

                    res.json(competitionScoreboard);
                    return next();

                }).catch(next);

        });

        application.post('/competitions', (req, res, next) => {

            const competition = new Competition(req.body);
            competition.save().then(newCompetition => {

                res.json(newCompetition);
                return next();

            }).catch(next);

        });

        application.put('/competitions/:difficulty', (req, res, next) => {

            const options = { overwrite: false };
            Competition.update({ difficulty: req.params.difficulty }, req.body, options).exec()
                .then(result => {

                    if (result.n) {
                        return Competition.findOne({ difficulty: req.params.difficulty })
                    } else {
                        throw new Error('Competition not Found');
                    }

                }).then(competition => {

                    res.json(competition);
                    return next();

                }).catch(next);

        });

    }

}

export const competitionRouter = new CompetitionRouter();