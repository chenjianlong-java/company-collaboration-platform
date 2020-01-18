import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'company-collaboration-platform';
    darkTheme = false;
    
    constructor(private oc: OverlayContainer) {
        // this.oc.getContainerElement().classList.add('myapp-dark-theme');
    }
    
    switchTheme(dark) {
        console.log(dark.checked);
        this.darkTheme = dark.checked;
    }
}
