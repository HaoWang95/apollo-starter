const speakers = require('../data/speakers.json');

const {DataSource} = require('apollo-datasource');

class SpeakerAPI extends DataSource{
    constructor(){
        super();
    }

    initialize(config){}

    getSpeakers(){
        return speakers;
    }

    getSpeakerById(id){
        return speakers.find(speaker => speaker.id == id);
    }

    getSpeakerByName(name){
        return speakers.find(speaker => speaker.name == name);
    }
}

module.exports = SpeakerAPI;