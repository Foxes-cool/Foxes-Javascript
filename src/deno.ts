let totals = new Object();

let foxes = {};

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

foxes.fox = async function(object) {
    return internal("fox", object);
}

foxes.curious = async function(object) {
    return internal("curious", object);
}

foxes.happy = async function(object) {
    return internal("happy", object);
}

foxes.scary = async function(object) {
    return internal("scary", object);
}

foxes.sleeping = async function(object) {
    return internal("sleeping", object);
}

export default foxes;
