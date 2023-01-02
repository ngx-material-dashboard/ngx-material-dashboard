import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { sandboxOf } from 'angular-playground';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from './alert.component';

@Component({
    selector: 'alert-sandbox',
    styles: [
        '.error{ color: #721c24; background-color: #f8d7da; }',
        '.info{ color: #0c5460; background-color: #d1ecf1; }',
        '.success{ color: #155724; background-color: #d4edda; }',
        '.warn{ color: #856404; background-color: #fff3cd; }'
    ],
    template: `
        <ngx-material-dashboard-alert></ngx-material-dashboard-alert>
        <div fxFlexFill fxLayout="column" fxLayoutAlign="center center">
            <div fxLayout="row" fxLayoutGap="10px">
                <button mat-raised-button (click)="error()" class="error">
                    Error
                </button>
                <button mat-raised-button (click)="info()" class="info">
                    Info
                </button>
                <button mat-raised-button (click)="success()" class="success">
                    Success
                </button>
                <button mat-raised-button (click)="warn()" class="warn">
                    Warn
                </button>
            </div>
        </div>
    `
})
class AlertSandboxComponent {
    constructor(private alertService: AlertService) {}

    error() {
        this.alertService.error('Uh oh an error occurred...', {
            autoClose: false
        });
    }

    info() {
        this.alertService.info('Some useful info...');
    }

    success() {
        this.alertService.success('All is good...');
    }

    warn() {
        this.alertService.warn('Warning...');
    }
}

export default sandboxOf(AlertComponent, {
    declarations: [AlertSandboxComponent, AlertsComponent],
    imports: [
        RouterTestingModule,
        MatButtonModule,
        OverlayModule,
        FlexLayoutModule,
        FontAwesomeModule
    ],
    providers: [AlertService]
}).add('default', {
    template: `
        <alert-sandbox></alert-sandbox>
    `
});
