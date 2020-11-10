import { Component, ElementRef, ViewChild } from '@angular/core';

/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" /> 

/* lo ponemos para que nos autocomplete */


declare var google; /* en algun punto de mi aplicacion he importado el google, buscala (en el index)*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* esto objeto (divMap) definido en el DOM lo traigo aqui para utilizarlos */
  @ViewChild('divMap') divMap: ElementRef;

  ngOnInit() {
    /* esto se hace para saber que esta disponible este objeto en nuestro navegador */
    if (navigator.geolocation) {
      /* watchPosition: es dar la ubicación cada cierto tiempo
  getCurrentPosition: es dar la ubicación todo el tiempo */
      navigator.geolocation.getCurrentPosition((position) => {
        this.loadMap(position);
        /* esto te debe decir donde esta ubicado en console */
      })

    } else {
      console.log('Actualizate !!!');

    }
  }

  loadMap(position) {
    const mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    /* se le da 2 parametros el donde se pinta y que opciones le pasas */
    new google.maps.Map(this.divMap.nativeElement, mapOptions)
  }

}
