const sessions = require('../data/sessions.json');

const { DataSource } = require('apollo-datasource');


class SessionAPI extends DataSource{
    constructor(){
        super();
    }

    initialize(config){}

    getSessions(){
        return sessions
    }

    getSessionById(id){
        console.log('getSessionById is called');
        const returnedSession = sessions.find(item => item.id == id);
        console.log(returnedSession);
        return returnedSession;
    }
}

module.exports = SessionAPI;