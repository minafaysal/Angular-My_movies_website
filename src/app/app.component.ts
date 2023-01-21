
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("routeAnimation", [
      transition("*<=>*",[
        style({opacity:0}),
        animate("500ms",style({opacity:1}))
    ])
    ])
  ]
})
export class AppComponent {

  title = 'LoginMoviesProject';
  prepareRoute(outlet: RouterOutlet): any {
    if (outlet.isActivated) {
      return outlet.activatedRoute.snapshot.url
    }

  }
}
