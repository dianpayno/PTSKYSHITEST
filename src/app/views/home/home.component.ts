import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/model/Activity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  private baseUrl = 'https://todo.api.devcode.gethired.id/activity-groups';
  message: string = 'Apakah anda yakin menghapus activity';
  activityList: any[];
  activity: Activity = {
    title: 'New Activity',
    email: 'dianpayno@gmail.com',
  };
  loading: boolean = true;

  ngOnInit(): void {
    this.fetchActivity();
  }

  addNewActivity() {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(`${this.baseUrl}?email=dianpayno@gmail.com`, this.activity, {
        headers,
      })
      .subscribe((res) => {
        console.log(res);
        this.fetchActivity();
      });
  }

  private fetchActivity() {
    this.http.get(`${this.baseUrl}?email=dianpayno@gmail.com`).subscribe(
      (res: any) => {
        this.activityList = res.data;
      }
    );
    setTimeout(() => {
      this.loading = false;
    },1000)
  }

  deleteActivity(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe((res) => {
      console.log(res);
      this.fetchActivity();
    });
  }

  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
}
