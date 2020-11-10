import { Component, ElementRef, ViewChild } from '@angular/core';

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
        console.log(position);

        /* esto te debe decir donde esta ubicado en console */

      })

    } else {
      console.log('Actualizate !!!');

    }
  }

}
