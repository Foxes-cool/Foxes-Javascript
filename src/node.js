const fetch = require("cross-fetch");

let totals = new Object();

async function internal(tag, object) {
    let update = false;
    let days = Math.floor(new Date()/86400000);
    if(totals[tag]) {
        if(totals[tag].time != days) {
            update = true;
        }
    }
    else{
        update = true;
    }
    if(update) {
        var count = await fetch(`https://foxes.cool/counts/${tag}`);
        totals[tag] = {time: days, count: await count.text()};
    }

    const ret = [];
    for (let d in object) {
        ret.push(d + '=' + object[d]);
    }

    return `https://img.foxes.cool/${tag}/${Math.floor(Math.random()*totals[tag].count)}.jpg?${ret.join("&")}`.replace(/\?$/,'');
}

module.exports.fox = async function(object) {
    return internal("fox", object);
}

module.exports.curious = async function(object) {
    return internal("curious", object);
}

module.exports.happy = async function(object) {
    return internal("happy", object);
}

module.exports.scary = async function(object) {
    return internal("scary", object);
}

module.exports.sleeping = async function(object) {
    return internal("sleeping", object);
}
