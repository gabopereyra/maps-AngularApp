import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador{
  color: string;
  marcador: mapboxgl.Marker
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  @ViewChild("mapa") mapaHtml! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  coordenadas: [number, number] = [-60.631512318686006, -32.95502240399944];

  marcadores : Marcador[] = []

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

  irMarcador(){
    
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevo = new mapboxgl.Marker({
      draggable: true,
      color: color,
    }).setLngLat(this.coordenadas)
      .addTo(this.mapa);

    this.marcadores.push({
      color: color,
      marcador: nuevo
    });
  }
}
