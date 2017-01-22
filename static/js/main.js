"use strict";
$(document).ready(() => {

    const ls = $("#ls");
    const miracle = new Howl({
        src: ["static/ogg/miracle.ogg"],
        loop: true
    });
    const dean = $("#dean-container");
    const lights = $("#light-container");
    const scores = $("#score-container");

    const miraclePartTwo = () => {
        dean.addClass("our-saviour-is-coming");
        window.setTimeout(() => lights.addClass("shiny"), 5050);
    };

    const timeForAMiracle = () => {
        ls.addClass("go-away");
        $("#github").addClass("black");
        window.setTimeout(() => ls.addClass("pls"), 5050);
        window.setTimeout(miraclePartTwo, 1700);
        miracle.play();
    };

    let readies = 0;
    const markReady = () => {
        if (++readies >= 2) {
            ls.addClass("robot-is-ready");
            window.setTimeout(timeForAMiracle, 1200);
        }
        console.log(readies + " of 2 ready for a miracle!")
    };

    miracle.once("load", markReady);

    const addLightBeam = rotation => {
        let light = $("<div>", {"class": "light"});
        light.css("transform", "rotateZ(" + rotation + "deg)");
        lights.append(light);
    };

    for (let i = 0; i < 12; i++)
        addLightBeam(i * 30);

    const addScoreCard = (score, red) => {
        let card = $("<div>", {"class": "score"});
        if (red)
            card.addClass("red");
        card.text(score);
        card.css("animation-delay", Math.random() * 3.3 + "s");
        card.css("left", Math.random() * 100 + "%");
        scores.append(card);
    };

    getEvents(new Date().getFullYear() - 1, events => {
        getScores(events[Math.floor(Math.random() * events.length)], eventScores => {
            for (let i = 0; i < eventScores.length && i < 15; i++) {
                addScoreCard(eventScores[i].red, true);
                addScoreCard(eventScores[i].blue, false);
            }
            markReady();
        });
    });
    
});