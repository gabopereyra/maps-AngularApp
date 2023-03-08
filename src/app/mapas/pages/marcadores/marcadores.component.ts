import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador{
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: [number, number];
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

    this.recuperarMarcadores();
  }

  irMarcador(marker : Marcador){
    this.mapa.flyTo({ 
      center: marker.marcador?.getLngLat()
    });

    this.guardarMarcadores();
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

    nuevo.on('dragend', () => this.guardarMarcadores())

    this.guardarMarcadores();
  }

  borrarMarcador(i : number){
    this.marcadores[i].marcador?.remove();

    this.marcadores.splice(i, 1);

    this.guardarMarcadores();
  }

  guardarMarcadores() {
    const marcadoresArr : Marcador[] = [];
    
    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();

      marcadoresArr.push({ 
        color: color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(marcadoresArr));
  }

  recuperarMarcadores() {
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const marcadoresArr : Marcador[] = JSON.parse(localStorage.getItem('marcadores')!);

    marcadoresArr.forEach( m =>{
      const nuevo = new mapboxgl.Marker({
        draggable: true,
        color: m.color,
      }).setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        color: m.color,
        marcador: nuevo
      });

      nuevo.on('dragend', () => this.guardarMarcadores())

    })

  }

}
