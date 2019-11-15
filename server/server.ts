import mongoose from "mongoose";
import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import { enviroment } from "../common/enviroment";
import { Router } from "../common/router";


//Classe responsável por inicializar as rotas e o banco de dados da aplicação
export class Server {
    application !: restify.Server;

    initializeDB(): Promise<any> {
        (<any>mongoose).Promise = global.Promise;
        return mongoose.connect(enviroment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }


    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "jogo-da-forca"
                });

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge: 86400,//guarda por um dia 
                    origins: ["*"],
                    allowHeaders: ["authorization"],
                    exposeHeaders: ["x-custom-header"]
                }
                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
                //plugins
                this.application.use(restify.plugins.bodyParser());
                this.application.use(restify.plugins.queryParser());

                //inicializa cada rota da aplicação.
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }

                //tenta escutar na porta determinada, se conseguir ira executar a aplicação
                this.application.listen(enviroment.server.port, () => {
                    resolve(this.application);
                });

            } catch (error) {
                reject(error);
            }



        });
    };

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDB()
            .then(() =>
                this.initRoutes(routers).then(() => this));
    }

};
