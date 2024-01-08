/*
see:
https://stackoverflow.com/questions/77507865/openlayers-color-space-lchuv-js-not-included-in-v8-2-download
import Map from './src/ol/Map.js';
import OSM from './src/ol/source/OSM.js';
import TileLayer from './src/ol/layer/Tile.js';
import View from './src/ol/View.js';
*/

$(document).ready(function(){



          const view = new ol.View({
              center: [0, 0],
              zoom: 2,
          });
          const map = new ol.Map({
            layers: [
              new ol.Tile({
                source: new ol.source.OSM(),
              }),
            ],
            target: 'mapPlaceholder',
            view: view,
          });
          
          const geolocation = new ol.Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
              enableHighAccuracy: true,
            },
            projection: view.getProjection(),
          });        

          geolocation.setTracking(true);

          geolocation.on('change', function () {
                    let pos = geolocation.getPosition();
                    map.getView().setCenter(pos);
          
          });
      });
