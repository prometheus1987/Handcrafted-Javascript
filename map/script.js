function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        mapTypeId: 'roadmap',
        center: {lat: 30.9433307, lng: -83.0067215}
    });

    var markers = [
        ['Atlanta', 33.7676338, -84.5606894],
        ['Valdosta', 30.8456432,-83.3532621],
        ['Tallahassee', 30.4670647,-84.3969418],
        ['Tampa', 27.9961981, -82.5942839],
        ['Orlando', 28.4810971, -81.5088361],
        ['Miami', 25.7823072, -80.3010438]
    ]

    var firstRoute = [
        {lat: 33.7676338, lng: -84.5606894},
        {lat: 30.8456432, lng: -83.3532624}
    ];

    var secondRoute = [
        {lat: 30.4670647, lng: -84.3969418},
        {lat: 28.4810971, lng: -81.5088361},
        {lat: 27.9961981, lng: -82.5942839},
        {lat: 25.7823072, lng: -80.3010438}
    ];

    var showFirstRoute = new google.maps.Polyline({
        path: firstRoute,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.4,
        strokeWeight: 2
    });

    var showSecondRoute = new google.maps.Polyline({
        path: secondRoute,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 0.4,
        strokeWeight: 2
    });

    var infoWindowContent = [
        [
            '<div class="content">' +
            '<h3>Atlanta</h3>' + '</div>',
            'Atlanta Info'
        ],
        [
            '<div class="content">' +
            '<h3>Valdosta</h3>' + '</div>',
            'Valdosta Info'
        ],
        [
            '<div class="content">' +
            '<h3>Tallahassee</h3>' + '</div>',
            'Tallhassee Info'
        ],
        [
            '<div class="content">' +
            '<h3>Tampa</h3>' + '</div>',
            'Tampa Info'
        ],
        [
            '<div class="content">' +
            '<h3>Orlando</h3>' + '</div>',
            'Orlando Info'
        ],
        [
            '<div class="content">' +
            '<h3>Miami</h3>' + '</div>',
            'Miami Info'
        ]
    ];

    showFirstRoute.setMap(map);
    showSecondRoute.setMap(map);
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    for ( i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
                $("#map-info").html(infoWindowContent[i][0]);
                $("#info-text").text(infoWindowContent[i][1]);
            }
        })(marker, i));
    }
}
