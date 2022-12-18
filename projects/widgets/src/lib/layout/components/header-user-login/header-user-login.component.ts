import { Component, Input, OnInit } from '@angular/core';
// import { AuthService } from '@app-core/services/auth.service';
// import { User } from '@ngx-material-dashboard/json-api/src/lib/models/user.model';

@Component({
    selector: 'ngx-material-dashboard-header-user-login',
    templateUrl: './header-user-login.component.html',
    styleUrls: ['./header-user-login.component.scss']
})
export class HeaderUserLoginComponent implements OnInit {
    username: string | undefined;

    // constructor(private authService: AuthService) {}

    ngOnInit(): void {
        // this.authService.currentUser.subscribe(
        //     (user: User) => {
        //         this.username = user.name;
        //     },
        //     (error: any) => {
        //         // TODO handle error
        //     }
        // );
    }

    login(): void {
        // this.authService.login();
    }
}
