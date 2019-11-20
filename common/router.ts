import * as restify from 'restify';


export abstract class Router {
    public abstract applyRoutes(application: restify.Server): void;
}
