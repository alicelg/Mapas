import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    /* esto se hace para saber que esta disponible este objeto en nuestro navegador */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

      })

      /* watchPosition: es dar la ubicación cada cierto tiempo
      getCurrentPosition: es dar la ubicación todo el tiempo */
    } else {
      console.log('Actualizate !!!');

    }
  }

}
