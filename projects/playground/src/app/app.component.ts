import { Component } from '@angular/core';
import { faClipboardList, faTable } from '@fortawesome/free-solid-svg-icons';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    logo = 'ngx-material-dashboard Playground';
    sidenavItems: SidenavItem[] = [
        { icon: faClipboardList, route: [''], text: 'Layout', selector: 'layout' },
        { icon: faTable, route: ['table'], text: 'Table', selector: 'table'}
    ];
}
