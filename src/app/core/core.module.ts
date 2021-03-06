import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.util';
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "../reducers/quote.reducer";


@NgModule({
    declarations: [HeaderComponent, FooterComponent, SidebarComponent],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forRoot({quote: counterReducer})
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    providers: [
        {
            provide: 'BASE_CONFIG',
            useValue: {
                uri: 'http://localhost:3000'
                // uri: 'http://manage.t.imooc.io/apis',
            }
        }
    ],
})
export class CoreModule {
    // 两个注解是防止循环调用和第一次的时候可以调用
    constructor(@Optional() @SkipSelf() parent: CoreModule,
                ir: MatIconRegistry,
                ds: DomSanitizer
    ) {
        if (parent) {
            throw new Error('模块已经存在，不能再次加载');
        }
        loadSvgResources(ir, ds);
    }
}
