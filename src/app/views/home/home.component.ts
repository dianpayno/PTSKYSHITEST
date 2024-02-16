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
  message: string = 'Apakah anda yakin menghapus activity';
  activityList: any[];
  activity: Activity = {
    title: 'New Activity',
    email: 'dianpayno@gmail.com',
  };

  ngOnInit(): void {
    this.fetchActivity()
  }

  addNewActivity() {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(
        'https://todo.api.devcode.gethired.id/activity-groups?email=dianpayno@gmail.com',
        this.activity,
        {
          headers,
        }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  private fetchActivity() {
    this.http.get('https://todo.api.devcode.gethired.id/activity-groups?email=dianpayno@gmail.com')
    .subscribe((res:any) => {
      console.log(res)
      this.activityList = res.data
    
    })
  }

  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
}
