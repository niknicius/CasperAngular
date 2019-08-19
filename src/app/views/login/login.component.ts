import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  constructor(private apiLogin: AuthService, private router: Router) {
  }

  login(username, password) {
    const l = this.apiLogin.login(username, password).subscribe((result) => {
      if (result) {
        console.log(result);
        if (this.apiLogin.isLogged()) {
          this.router.navigate(['dashboard']);
        }
      }
    }, error => {
        alert('Verifique seus dados e tente novamente.');
        console.log(error);
      });
  }

  ngOnInit() {
    if (this.apiLogin.isLogged()) {
      this.router.navigate(['dashboard']);
    }
  }
}
