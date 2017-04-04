mapboxgl.accessToken = 'pk.eyJ1IjoicHJvbWV0aGV1czE5ODciLCJhIjoiY2l5Nml0cDl1MDA2djJ4cWhqZGhnaXczbSJ9.Fn_lmOLl4liXoN54d7dEWw';

var map = new mapboxgl.Map({
    container: 'mapbox-map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 5,
    center: [-84.5606894, 33.7676338]
});

    map.on('load', function () {
        map.addLayer({
            "id": "places",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "title": "Atlanta",
                            "description": "<strong>Atlanta</strong>",
                            'marker-color': '#3ca0d3',
                            'marker-size': 'large'
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.5606894, 33.7676338]
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-83.3532624, 30.8456432]
                        },
                        "properties": {
                            "title": "Valdosta",
                            "description": "<strong>Valdosta</strong>",
                            icon: "monument"
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.3969418, 30.4670647]
                        },
                        "properties": {
                            "title": "Tallahassee",
                            "description": "<strong>Tallahassee</strong>",
                            icon: "monument"
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.5942839, 27.9961981]
                        },
                        "properties": {
                            "title": "Tampa",
                            "description": "<strong>Tampa</strong>",
                            icon: "monument"
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.5088361, 28.4810971]
                        },
                        "properties": {
                            "title": "Orlando",
                            "description": "<strong>Orlando</strong>",
                            icon: "monument"
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.3010438, 25.7823072]
                        },
                        "properties": {
                            "title": "Miami",
                            "description": "<strong>Miami</strong>",
                            icon: "monument"
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "{icon}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
    });

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.description)
            .addTo(map);
    });


    map.on('load', function () {

        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [-84.5606894, 33.7676338],
                            [-83.3532624, 30.8456432]
                        ]
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#0000FF",
                "line-width": 8
            }
        });
    });
});
