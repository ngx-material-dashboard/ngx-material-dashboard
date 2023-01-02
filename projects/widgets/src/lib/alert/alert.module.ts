import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './pages/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertsComponent } from './components/alerts/alerts.component';

@NgModule({
    declarations: [AlertComponent, AlertsComponent],
    imports: [CommonModule, MatButtonModule, OverlayModule, FontAwesomeModule]
})
export class AlertModule {}
