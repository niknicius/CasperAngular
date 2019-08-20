import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {News} from '../../../models/news';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  newsForm: FormGroup;

  private news: any;
  private id;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
      if (id) {
        this.apiService.get('news/'.concat(id)).subscribe( (data) => {
          if (data) {
            this.news = data;
          }
        }, error => {
          if (error.status === 401){
            this.handle401();
          }
        });
      }
  });

    this.newsForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      theme: [null, [Validators.required]],
      img: [null, [Validators.required]],
    });
  }

  handle401() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (this.newsForm.valid) {
      const news = new News(this.newsForm.value.title, this.newsForm.value.description, this.newsForm.value.theme, this.newsForm.value.img);
      const a = this.apiService.put('news/'.concat(this.id), news).subscribe(data => {
        alert('Notícia atualizada!');
        location.reload();
      }, error => {
        if (error.status === 200) {
          alert('Notícia atualizada!');
          location.reload();
        } else {
          alert('Erro ao atualizar');
        }
        if (error.status === 401) {
          this.handle401();
        }
      });

      console.log(a);
    } else {
      alert('Confira todos os campos!');
    }
  }

}
