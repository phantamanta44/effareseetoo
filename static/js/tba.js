"use strict";
const appId = "phantamanta44:are_you_ready_for_a_miracle:1.0.0";

const setAppId = xhr => xhr.setRequestHeader("X-TBA-App-Id", appId);

const ajaxReq = (url, cb) =>
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: cb,
        beforeSend: setAppId
    });

const getEvents = (year, cb) =>
    ajaxReq("https://www.thebluealliance.com/api/v2/events/" + year, events => cb(events.map(event => event.key)));

const getScores = (event, cb) =>
    ajaxReq("https://www.thebluealliance.com/api/v2/event/" + event + "/matches",
        matches => cb(matches.map(match => {
            return {red: match.alliances.red.score, blue: match.alliances.blue.score};
        }))
    );