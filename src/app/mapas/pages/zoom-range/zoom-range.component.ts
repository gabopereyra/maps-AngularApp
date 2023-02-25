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

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-60.631512318686006, -32.95502240399944],
      zoom: 15
    });
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

}
