import { UserService } from './shared/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-organic-shop';
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    })
  }
}
