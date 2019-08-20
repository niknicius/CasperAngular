import {Component, OnInit, ViewChild} from '@angular/core';

import {ModalDirective} from 'ngx-bootstrap/modal';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {News} from '../../models/news';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router,
              private formBuilder: FormBuilder) { }

  newsForm: FormGroup;

  @ViewChild('newsModal', {static: false}) public newsModal: ModalDirective;

  private newsList: Object = [];

  ngOnInit() {
    this.apiService.get('news').subscribe(data => {
      console.log(data);
      this.newsList = data;
    }, error => {
      console.log(error);
    });

    this.newsForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      theme: [null, [Validators.required]],
      img: [null, [Validators.required]],
    });

  }

  onSubmit() {
    if (this.newsForm.valid) {
      const news = new News(this.newsForm.value.title, this.newsForm.value.description, this.newsForm.value.theme, this.newsForm.value.img);
      this.apiService.post('news', news).subscribe(data => {
        alert('Notícia cadastrada!');
        location.reload();
      }, error => {
        if (error.status === 200) {
          alert('Notícia cadastrada!');
          location.reload();
        } else {
          alert('Erro ao Cadastrar');
        }
        if (error.status === 401) {
          this.handle401();
        }
      });
    } else {
      alert('Confira todos os campos!');
    }
  }

  handle401() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  deleteNews(id) {
    this.apiService.delete('news/'.concat(id)).subscribe(data => {
      alert('Notícia deletada');
    }, error => {
      if (error.status === 200) {
        alert('Notícia deletada');
        location.reload();
      } else {
        alert('Erro ao Deletar!');
      }
      if (error.status === 401) {
        this.handle401();
      }
    });
  }

  edit(id) {
    this.router.navigate(['/news/edit/', id]);
  }
}
