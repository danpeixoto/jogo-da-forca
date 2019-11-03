import * as restify from 'restify';
import mongoose from 'mongoose';
import {Router} from '../common/router';
import {enviroment} from '../common/enviroment';


//Classe responsável por inicializar as rotas e o banco de dados da aplicação
export class Server{
    application !: restify.Server;

    initializeDB(): Promise<any>{
        (<any> mongoose).Promise = global.Promise;
        return mongoose.connect(enviroment.db.url,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
    }


    initRoutes(routers: Router[]):Promise<any>{
        return new Promise((resolve,reject)=>{
            try{
                this.application = restify.createServer({
                    name:'jogo-da-forca'
                });
            }catch(error){
                reject(error);
            }

            //plugins
            this.application.use(restify.plugins.bodyParser());
            this.application.use(restify.plugins.queryParser());

            //inicializa cada rota da aplicação.
            for(let router of routers){
                router.applyRoutes(this.application);
            }

            //tenta escutar na porta determinada, se conseguir ira executar a aplicação
            this.application.listen(enviroment.server.port,()=>{
                resolve(this.application);
            })

        });
    };

    bootstrap(routers:Router[]=[]):Promise<Server>{
        return this.initializeDB()
        .then(()=>
          this.initRoutes(routers).then(()=>this));
    }

};