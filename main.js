/*
import Map from './src/ol/Map.js';
import OSM from './src/ol/source/OSM.js';
import TileLayer from './src/ol/layer/Tile.js';
import View from './src/ol/View.js';
*/

const map = new ol.Map({
  layers: [
    new ol.TileLayer({
      source: new ol.OSM(),
    }),
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2,
  }),
});
