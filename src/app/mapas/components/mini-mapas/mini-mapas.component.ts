import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapas',
  templateUrl: './mini-mapas.component.html',
  styleUrls: ['./mini-mapas.component.css']
})
export class MiniMapasComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa! : ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    var map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
  }

}
