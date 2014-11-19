var start = [];
var end = [];
var route = L.geoJson();
var buildings;
var map;

function clickHandler(feature) {
    if (start == "") {
        //Start station is blank, so fill it in
        start = feature.properties;
    }
    else if (end == "") {
        //Start station not blank, end station not.
        end = feature.properties;
        //Get and show route...
        $.getJSON("backend.php", {
        'start': start,
        'end': end,
        }, function(data) {
            route = L.geoJson(data).addTo(map);
        }); 
    }
    else {
        map.removeLayer(route);
        route = L.geoJson();
        start = feature.properties;
        end = [];
    }
}
function onEachFeatureHandler(feature, layer) {
    layer.on('click', function (e) {clickHandler(feature);})
}
$(document).ready(function() {
    map = L.map('map').setView([40.44364, -79.94443], 21);
    var MB_URL = 'http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    L.tileLayer(MB_URL, {minZoom: 18, maxZoom: 23, id: 'examples.map-20v6611k'}).addTo(map);  
    $.getJSON("indoor.json", function(data) {
        buildings = L.geoJson(data, {onEachFeature: onEachFeatureHandler}).addTo(map);
    });        
});