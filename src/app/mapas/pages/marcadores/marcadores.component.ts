import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  @ViewChild("mapa") mapaHtml! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  coordenadas: [number, number] = [-60.631512318686006, -32.95502240399944];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });

    const maker = new mapboxgl.Marker()
          .setLngLat(this.coordenadas)
          .addTo(this.mapa);
  }

}
