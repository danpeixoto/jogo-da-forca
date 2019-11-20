import * as restify from "restify";
import { Router } from "../common/router";
import { Competition } from "./competition.model";

class CompetitionRouter extends Router {

    constructor() {
        super();
    }

    public applyRoutes(application: restify.Server): void {

        application.get("/competitions", (req, res, next) => {

            Competition.find()
                .populate("players")
                .then(competitions => {

                    res.json(competitions);
                    return next();

                }).catch(next);
        });

        // Retorna pela resposta a competição e todos os documentos dos jogadores nela, ordenados de forma crescente pelo score
        application.get("/competitions/:difficulty", (req, res, next) => {

            Competition.findOne({ difficulty: req.params.difficulty })
                .populate({
                    path: "players",
                    options: {
                        sort: { "score": -1 }
                    }
                })
                .then(competition => {

                    res.json(competition);
                    return next();

                }).catch(next);

        });

        application.post("/competitions", (req, res, next) => {

            const competition = new Competition(req.body);
            competition.save().then(newCompetition => {

                res.json(newCompetition);
                return next();

            }).catch(next);

        });

        application.put("/competitions/:difficulty", (req, res, next) => {

            const options = { overwrite: false };
            Competition.update({ difficulty: req.params.difficulty }, req.body, options).exec()
                .then(result => {

                    if (result.n) {
                        return Competition.findOne({ difficulty: req.params.difficulty })
                    } else {
                        throw new Error("Competition not Found");
                    }

                }).then(competition => {
                    competition.players.splice(9);// remove todos os usuarios que estão abaixo da 10ª posição
                    res.json(competition);
                    return next();
                }).catch(next);

        });

        application.put("/competitions/:difficulty/:id", (req, res, next) => {

            Competition.findOne({ difficulty: req.params.difficulty })
                .then(competition => {
                    competition.players.push(req.params.id);
                    competition.save();

                    res.json(competition);
                    return next();
                }).catch(next);

        });

    }

}

export const competitionRouter = new CompetitionRouter();
