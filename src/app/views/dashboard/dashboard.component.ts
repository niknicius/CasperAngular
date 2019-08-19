import {Component, OnInit, ViewChild} from '@angular/core';

import {ModalDirective} from 'ngx-bootstrap/modal';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  @ViewChild('newsModal', {static: false}) public newsModal: ModalDirective;

  private newsList: Object = [];

  ngOnInit() {
    this.apiService.get('news').subscribe(data => {
      console.log(data);
      this.newsList = data;
    }, error => {
      console.log(error);
    });
  }

  handle401() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  deleteNews(id) {
    this.apiService.delete('news/'.concat(id)).subscribe(data => {
      alert('Notícia deletada');
    }, error => {
      alert('Erro ao deletar!');
      console.log(error);
      if (error.status === 401) {
        this.handle401();
      }
    });
  }
}
