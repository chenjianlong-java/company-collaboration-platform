import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    ir.addSvgIcon('text', ds.bypassSecurityTrustResourceUrl('assets/img/text.svg'));
};

// es6语法
//     export function XX() {
//
//     }
