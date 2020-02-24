'use strict';



let diceRoll = (userContext, events, done) =>{

    let rolledNumber = "/"+Math.ceil(Math.random()*1000011)+"/styles";
    userContext.item = rolledNumber;
    return done();
}

module.exports = {
    diceRoll
};