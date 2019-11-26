import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full'} // full代表是如果斜杠后面什么都不放就会去login页面
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    //自己填好LoginModule路径
    // {path: 'login', component: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
