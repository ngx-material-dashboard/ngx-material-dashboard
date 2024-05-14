import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from './pages/icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [IconComponent],
    exports: [IconComponent],
    imports: [CommonModule, MatIconModule, FontAwesomeModule]
})
export class IconModule {}
