import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit, AfterViewInit {
  @ViewChild("mapa") mapaHtml! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-60.631512318686006, -32.95502240399944],
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
