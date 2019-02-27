const express = require('express');
const router = express.Router();
const gameService = require('./../services/game.service');
const socket = require('./socket');

// routes
router.post('/create', create);
router.post('/join', join);
router.post('/leave', leave);

module.exports = router;

function create(req, res, next) {
    const config = req.body;
    gameService.create(config)
        .then(game => {
            socket.updateLobby();
            if (game) {
                res.json(game)
            } else {
                return {}
            }
        })
        .catch(err => next(err));
}

function join(req, res, next) {
    gameService.join(req.body.gameId, req.body.user)
        .then(joinedGame => {
            socket.updateLobby();
            res.json(joinedGame)
        })
        .catch(err => next(err));
}

function leave(req, res, next) {
    gameService.leave(req.body.gameId, req.body.playerId)
        .then(leftGame => {
            socket.updateLobby();
            res.json(leftGame)
        })
        .catch(err => next(err));
}
