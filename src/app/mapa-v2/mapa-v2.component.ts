import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-v2',
  templateUrl: './mapa-v2.component.html',
  styleUrls: ['./mapa-v2.component.css']
})
export class MapaV2Component implements OnInit {

  latitud: number;
  longitud: number;

  constructor() {
    this.latitud = 41.01243224352;
    this.longitud = -3.1212342;
  }

  ngOnInit(): void {
  }

}
