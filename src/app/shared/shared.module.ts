import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

/**
 * @Description: 主要目的是把程序都需要的一些东西导入进来在导出出去,这样有哪里需要比如commonModule的话直接引入这个sharedModule就可以了
 *               以后大家共享的组件也可以放在这里
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
    ],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
    
    ]
})
export class SharedModule {
}
