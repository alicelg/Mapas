import { Component, ElementRef, ViewChild } from '@angular/core';

/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" /> 

/* lo ponemos para que nos autocomplete */


/*  declare var google; en algun punto de mi aplicacion he importado el google, buscala (en el index)*/
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
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    /* se le da 2 parametros el donde se pinta y que opciones le pasas */
    const mapa = new google.maps.Map(this.divMap.nativeElement, mapOptions)

    const icon = {
      url: 'https://i.pinimg.com/originals/12/15/30/12153058cf7f17ac38b1342db1d30be5.gif',
      scaledSize: new google.maps.Size(100, 100),

      /* con url puedo poner también imagenes que tenga yo */

    }

    /* marcador  */
    const markerPosition = new google.maps.Marker({
      position: mapa.getCenter(),
      animation: google.maps.Animation.BOUNCE,
      icon: icon

      /* BOUNCE: da saltitos
      DROP: cae el ubicador */
    });

    markerPosition.setMap(mapa);

    /* creo un evento */
    google.maps.event.addDomListener(mapa, 'click', event => {
      /* console.log(event.latLng.lat()); */
      const marker = new google.maps.Marker({
        position: event.latLng,
        animation: google.maps.Animation.DROP,
        icon: icon
      });

      marker.setMap(mapa);

      /* al darle click se eliminar */
      google.maps.event.addListener(marker, 'click', envent => {
        marker.setMap(null);
      });

    });
  }



}
