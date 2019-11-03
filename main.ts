import {Server} from './server/server';
import {playerRouter} from './player/player.router';
import {wordRouter} from './word/word.router';
import {competitionRouter} from './competiton/competition.router';

const server = new Server();

server.bootstrap([playerRouter,wordRouter,competitionRouter]).then(server =>{
    console.log('Server s listenig on:',server.application.address());
}).catch(error=>{
    console.log('Server failed to start.');
    console.log(error);
    process.exit(1);
})