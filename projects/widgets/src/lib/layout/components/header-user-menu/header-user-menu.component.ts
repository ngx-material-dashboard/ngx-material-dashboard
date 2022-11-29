import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { AuthService } from '@app-core/services/auth.service';

@Component({
    selector: 'ngx-material-dashboard-header-user-menu',
    templateUrl: './header-user-menu.component.html',
    styleUrls: ['./header-user-menu.component.scss']
})
export class HeaderUserMenuComponent {

    @Input() username = '';
    @Output() logoutClick: EventEmitter<boolean> = new EventEmitter();
    caretDown = faCaretDown;

    logout(): void {
        this.logoutClick.emit(true);
    }
}
