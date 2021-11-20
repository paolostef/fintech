import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements AfterViewInit {
  @Input() coords!: number[];
  @Input() zoom: number = 17;
  @Input() addMarker: boolean = true;

  map?: L.Map;

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    this.map = L.map('map', {
      center: [this.coords[0], this.coords[1]],
      zoom: this.zoom,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    if (this.addMarker) {
      var myIcon = L.icon({
        iconUrl: 'assets/images/leaflet/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [-3, -76],
        shadowUrl: 'assets/images/leaflet/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [22, 41]
    });
      L.marker([this.coords[0], this.coords[1]], {icon: myIcon}).addTo(this.map);
    }
  }
}
