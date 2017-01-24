"use strict";
$(document).ready(() => {

    const ls = $("#ls");
    const miracle = new Howl({
        src: ["static/ogg/miracle.ogg", "static/mp3/miracle.mp3"],
        loop: true
    });
    const intro = new Howl({
        src: ["static/ogg/intro.ogg", "static/mp3/intro.mp3"]
    });
    const dean = $("#dean-container");
    const lights = $("#light-container");
    const scores = $("#score-container");
    let scoreCache = [];
    let scoreWait = 3300;

    const miraclePartThree = () => {
        miracle.play();
        dean.addClass("our-saviour-is-coming");
        window.setTimeout(() => lights.addClass("shiny"), 5050);
    };

    const addScoreCard = () => {
        let score = scoreCache.pop();
        let card = $("<div>", {"class": "score"});
        if (score.red)
            card.addClass("red");
        card.text(score.score);
        card.css("left", Math.random() * 100 + "%");
        scores.append(card);
    };

    const miraclePartTwo = () => {
        addScoreCard();
        if (scoreCache.length > 0)
            window.setTimeout(miraclePartTwo, scoreWait);
    };

    const timeForAMiracle = () => {
        ls.addClass("go-away");
        $("#github").addClass("black");
        window.setTimeout(() => ls.addClass("pls"), 5050);
        window.setTimeout(miraclePartTwo, 1700);
        intro.play();
    };

    let readies = 0;
    const markReady = () => {
        if (++readies >= 3) {
            ls.addClass("robot-is-ready");
            window.setTimeout(timeForAMiracle, 1200);
        }
        console.log(readies + " of 2 ready for a miracle!")
    };

    miracle.once("load", markReady);
    intro.once("load", markReady);
    intro.once("end", miraclePartThree);

    const addLightBeam = rotation => {
        let light = $("<div>", {"class": "light"});
        light.css("transform", "rotateZ(" + rotation + "deg)");
        lights.append(light);
    };

    for (let i = 0; i < 12; i++)
        addLightBeam(i * 30);

    getEvents(new Date().getFullYear() - 1, events => {
        getScores(events[Math.floor(Math.random() * events.length)], eventScores => {
            for (let i = 0; i < eventScores.length && i < 15; i++) {
                scoreCache.push({score: eventScores[i].red, red: true});
                scoreCache.push({score: eventScores[i].blue, red: false});
            }
            scoreWait = 3300 / scoreCache.length;
            console.log(scoreWait);
            markReady();
        });
    });
    
});