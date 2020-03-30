import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module'; // 如果命名为index后就不需要填写后面的core.module
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './login/login.module';
import {ProjectModule} from './project/project.module';
import {TaskModule} from './task/task.module';
import {ServicesModule} from './services';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ProjectModule,
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        LoginModule,
        TaskModule,
        ServicesModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
