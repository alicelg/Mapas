import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../paises.service';

@Component({
  selector: 'app-mapa-v2',
  templateUrl: './mapa-v2.component.html',
  styleUrls: ['./mapa-v2.component.css']
})
export class MapaV2Component implements OnInit {

  latitud: number;
  longitud: number;
  paises: any[];


  constructor(private paisesService: PaisesService) {

    this.latitud = 40.01243224352;
    this.longitud = -3.1212342;
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
    });

    this.paisesService.getEuropean()
      .then(response => {
        console.log(response);
        this.paises = response;

      })

  }

  onDblClick($event) {
    console.log($event);
  }
}
