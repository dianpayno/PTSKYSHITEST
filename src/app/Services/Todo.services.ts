import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from 'src/app/model/Activity';

@Injectable({
  providedIn: 'root',
})
export class TodoServices {
  http: HttpClient = inject(HttpClient);
  baseUrl = 'https://todo.api.devcode.gethired.id/activity-groups';
  activity: Activity = {
    title: 'New Activity',
    email: 'dianpayno@gmail.com',
  };

  updateTitle: {
    title: string;
  };

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  addNewActivity() {
    return this.http.post(
      `${this.baseUrl}?email=dianpayno@gmail.com`,
      this.activity,
      {
        headers: this.headers,
      }
    );
  }

  deleteActivity(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  fetchActivity() {
    return this.http.get(`${this.baseUrl}?email=dianpayno@gmail.com`, {
      headers: this.headers,
    });
  }

  fetchDetailActivity(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  updateActivity(data: any, id: number) {
    this.updateTitle = {
      title: data.title,
    };
    return this.http.patch(`${this.baseUrl}/${id}`, this.updateTitle);
  }
}
