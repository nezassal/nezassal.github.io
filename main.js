/*
see:
https://stackoverflow.com/questions/77507865/openlayers-color-space-lchuv-js-not-included-in-v8-2-download
import Map from './src/ol/Map.js';
import OSM from './src/ol/source/OSM.js';
import TileLayer from './src/ol/layer/Tile.js';
import View from './src/ol/View.js';

import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';


*/

$(document).ready(function(){



          const view = new ol.View({
              center: [0, 0],
              zoom: 2,
          });
          const map = new ol.Map({
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM(),
              }),
            ],
            target: 'map',
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
            $(#'accuracy').innerText = geolocation.getAccuracy() + ' [m]';
            $(#'altitude').innerText = geolocation.getAltitude() + ' [m]';
            $(#'altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
            $(#'heading').innerText = geolocation.getHeading() + ' [rad]';
            $(#'speed').innerText = geolocation.getSpeed() + ' [m/s]';
          });

          const accuracyFeature = new ol.Feature();
          geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
          });
          
          const positionFeature = new ol.Feature();
          positionFeature.setStyle(
            new ol.style.Style({
              image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                  color: '#3399CC',
                }),
                stroke: new ol.style.Stroke({
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
          
          new ol.layer.Vector({
            map: map,
            source: new ol.source.Vector({
              features: [accuracyFeature, positionFeature],
            }),
          });



          
          
      });
