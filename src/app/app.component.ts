/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" /> 
import { Component, ElementRef, ViewChild } from '@angular/core';


/* lo ponemos para que nos autocomplete */


/*  declare var google; en algun punto de mi aplicacion he importado el google, buscala (en el index)*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mapa: google.maps.Map;
  markers: google.maps.Marker[];


  constructor() {
    this.markers = [];
  }

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
    this.mapa = new google.maps.Map(this.divMap.nativeElement, mapOptions)

    const icon = {
      url: 'https://i.pinimg.com/originals/12/15/30/12153058cf7f17ac38b1342db1d30be5.gif',
      scaledSize: new google.maps.Size(50, 50),

      /* con url puedo poner también imagenes que tenga yo */

    }

    /* marcador  */
    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      animation: google.maps.Animation.BOUNCE,
      icon: icon

      /* BOUNCE: da saltitos
      DROP: cae el ubicador */
    });

    markerPosition.setMap(this.mapa);

    /* creo un evento */
    google.maps.event.addListener(this.mapa, 'click', event => {


      /* console.log(event.latLng.lat()); */
      const marker = new google.maps.Marker({
        position: event.latLng,
        animation: google.maps.Animation.DROP,
        icon: icon
      });
      marker.setDraggable(true);
      marker.setMap(this.mapa);

      this.markers.push(marker);

      /* al darle click se eliminar */
      /* google.maps.event.addListener(marker, 'mouseover', event => {
        marker.setMap(null);
      });
 */
      google.maps.event.addListener(marker, 'mouseout', event => {
        marker.setAnimation(google.maps.Animation.BOUNCE)
      })

    });

    const autocomplete = new google.maps.places.Autocomplete(
      document.querySelector('#inputPlaces'),
    );

    google.maps.event.addListener(autocomplete, 'place_changed', event => {
      console.log(event);
      const place = autocomplete.getPlace();
      console.log(place);

      /* this.mapa.setCenter(place.geometry.location);

      const marker = new google.maps.Marker({
        position: place.geometry.location,
      })
      marker.setMap(this.mapa); */

      /* calcular una rutas desde mi posición hasta el elemento buscado */
      this.calcularRuta(mapOptions.center, place.geometry.location);

    });


  }

  onClick() {

    this.calcularRuta('plaza españa 11, madrid', 'calle  reina sofia 5, madrid')

    /* objetos para la creacion y pintado de la ruta */
    /* const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.mapa);
  
    directionsService.route({
      origin: 'plaza españa 11, madrid',
      destination: 'calle ayala 160, madrid',
      travelMode: google.maps.TravelMode.WALKING
    }, result => {
      console.log(result);
  
      esto es para pintarlo 
      directionsRenderer.setDirections(result);
  
    }) */
  }

  /* GENERICO */
  calcularRuta(
    pOrigen: string | google.maps.LatLng,
    pDestino: string | google.maps.LatLng,
    pModoViaje: google.maps.TravelMode = google.maps.TravelMode.DRIVING) {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.mapa);

    directionsService.route({
      origin: pOrigen,
      destination: pDestino,
      travelMode: pModoViaje
    }, result => {
      directionsRenderer.setDirections(result);
    })

  }

  onClickBorrar() {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

}
