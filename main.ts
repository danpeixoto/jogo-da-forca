import { competitionRouter } from './competiton/competition.router';
import { playerRouter } from './player/player.router';
import { Server } from './server/server';
import { wordRouter } from './word/word.router';

const server = new Server();

server.bootstrap([playerRouter, wordRouter, competitionRouter]).then(server => {
    console.log('Server s listenig on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start.');
    console.log(error);
    process.exit(1);
})
