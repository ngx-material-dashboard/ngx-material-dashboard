import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppCoreModule } from './app-core/app-core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './domains/task/task.module';

@NgModule({
    declarations: [AppComponent],
    imports: [TaskModule, AppRoutingModule, AppCoreModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
