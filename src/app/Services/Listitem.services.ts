import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { todoItems } from '../model/ItemList';

@Injectable({
  providedIn: 'root',
})
export class ListItemServices {
  http: HttpClient = inject(HttpClient);
  baseUrl = 'https://todo.api.devcode.gethired.id/todo-items';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  listItem: todoItems;

  addListItems(data: any, id: number) {
    this.listItem = {
      ...data,
      activity_group_id: id,
    };

    return this.http.post(this.baseUrl, this.listItem, {
      headers: this.headers,
    });
  }

  updateListItems(data: any, id: number, item: number) {
    this.listItem = {
      ...data,
      activity_group_id: id,
    };
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.patch(`${this.baseUrl}/${item}`, this.listItem, {
      headers,
    });
  }

  deleteListItem(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateIsCompleted(item: any) {
    this.listItem = {
      ...item,
      is_active: !item.is_active,
    };

    return this.http.patch(`${this.baseUrl}/${item.id}`, this.listItem, {
      headers: this.headers,
    });
  }
}
