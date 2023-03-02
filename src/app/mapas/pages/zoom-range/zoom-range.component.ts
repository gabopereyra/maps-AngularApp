import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("mapa") mapaHtml! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  coordenadas: [number, number] = [-60.631512318686006, -32.95502240399944];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});

  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev)=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev)=>{
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (ev)=>{
      const { lng, lat } = ev.target.getCenter();

      this.coordenadas = [lng, lat];
    });
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomChange(value: string){
    this.mapa.zoomTo(Number(value));
  }

}
