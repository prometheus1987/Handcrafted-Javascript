mapboxgl.accessToken = 'pk.eyJ1IjoicHJvbWV0aGV1czE5ODciLCJhIjoiY2l5Nml0cDl1MDA2djJ4cWhqZGhnaXczbSJ9.Fn_lmOLl4liXoN54d7dEWw';
var map = new mapboxgl.Map('map-two', 'mapbox.dc-markers', {
    // the options here prevent mouse wheel or trackpad scrolling
    // and restrict the zooms to zoom levels 14 through 18
    scrollWheelZoom: false,
    maxZoom: 14,
    minZoom: 10
}).setView([38.8906, -77.01313], 12);