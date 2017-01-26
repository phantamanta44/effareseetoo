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

    const neededReadies = 3;
    let readies = 0;
    const markReady = () => {
        if (++readies >= neededReadies) {
            ls.addClass("robot-is-ready");
            window.setTimeout(timeForAMiracle, 1200);
        }
        console.log(readies + " of " + neededReadies + " ready for a miracle!")
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

    let usingDefault = false;

    const initScores = event => {
        try {
            getScores(event, eventScores => {
                if (usingDefault && eventScores < 10) {
                    console.log("Not enough matches in event " + event + "!");
                    useDefaultEvents();
                } else {
                    for (let i = 0; i < eventScores.length && i < 15; i++) {
                        scoreCache.push({score: eventScores[i].red, red: true});
                        scoreCache.push({score: eventScores[i].blue, red: false});
                    }
                    scoreWait = 3300 / scoreCache.length;
                    markReady();
                    $("#bg-site").attr("src", "https://www.thebluealliance.com/event/" + event);
                }
            });
        } catch (e) {
            document.write("No such event \"" + event + "\"");
            console.log(e);
        }
    };

    let defaultEventCache;
    const loadDefaultEvents = cb => {
        usingDefault = true;
        getEvents(new Date().getFullYear() - 1, events => {
            defaultEventCache = events;
            cb();
        });
    };

    const useDefaultEvents = () =>
        initScores(defaultEventCache[Math.floor(Math.random() * defaultEventCache.length)]);

    let q = {};
    if (!!document.location.search) {
        let parts = document.location.search.substring(1).split("&");
        for (let i = 0; i < parts.length; i++) {
            let entry = parts[i].split("=");
            q[entry[0]] = entry[1];
        }
    }

    if (!q.e)
        loadDefaultEvents(useDefaultEvents);
    else
        initScores(q.e);
    
});