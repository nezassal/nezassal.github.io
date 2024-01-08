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
              new ol.layer.TileLayer({
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

          // update the HTML page when the position changes.
          geolocation.on('change', function () {
            el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
            el('altitude').innerText = geolocation.getAltitude() + ' [m]';
            el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
            el('heading').innerText = geolocation.getHeading() + ' [rad]';
            el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
          });

          const accuracyFeature = new ol.Feature();
          geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
          });
          
          const positionFeature = new ol.Feature();
          positionFeature.setStyle(
            new ol.Style.Style({
              image: new ol.Style.Circle({
                radius: 6,
                fill: new ol.Style.Fill({
                  color: '#3399CC',
                }),
                stroke: new ol.Style.Stroke({
                  color: '#fff',
                  width: 2,
                }),
              }),
            })
          );
          
          geolocation.on('change:position', function () {
            const coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
          });
          
          new VectorLayer({
            map: map,
            source: new ol.source.Vector({
              features: [accuracyFeature, positionFeature],
            }),
          });



          
          
      });
