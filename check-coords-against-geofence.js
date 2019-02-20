// This script is meant for checking a list of coordinates against a geofence.
// It returns a true value if the point is inside of the area.
// It outputs a JSON file, use rawgraphs if you want to easily convert it
// into a tabular format

const fs = require('fs');
const turf = require('@turf/turf');
const d3 = require('d3');


let fullFence = [];

fullFence = turf.polygon([[

]]);


let places = fs.readFileSync('./input/scores.csv').toString();

places = d3.csvParse(places);

//places = JSON.parse(places);

places.forEach(function (d) {
    let thisPoint = [+d['Lng'], +d['Lat']];
    thisPoint = turf.point(thisPoint);
    d.insideFence = turf.booleanContains(fullFence, thisPoint);
});

//Flat on a single level object
places = places.map(function (d) {
    return {
        "id": d['FID'],
        "latitude": d['Lat'],
        "longitude": d['Lng'],
        "safe": d['Perception Safety'],
        "human": d['Q3 Human scale'],
        "favourite": d['Q5 Averall/Better'],
        "insideFence": d.insideFence
    }
})

fs.writeFileSync('./output/scores-area.json', JSON.stringify(places));
