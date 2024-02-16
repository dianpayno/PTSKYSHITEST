import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { todoItems, ItemList } from 'src/app/model/ItemList';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent implements OnInit {
  editActive: boolean = false;
  isLoading: boolean = true;
  titleAddList: string = 'Tambah List Item';
  titleEditList: string = 'Edit  List Item';
  message: string = 'Apakah anda yakin menghapus list item';
  defaultValue: todoItems = {
    title: null,
    priority: 'very-high',
  };
  newData: ItemList;
  updateTitle: {
    title: string;
  };
  listItem: todoItems;

  listId: number;
  baseUrl = 'https://todo.api.devcode.gethired.id/activity-groups/';
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  http: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.listId = this.activeRoute.snapshot.params['id'];
    this.fetchDetailItem();
  }

  addListItem(data: any) {
    this.listItem = {
      ...data,
      activity_group_id: this.listId,
    };
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post('https://todo.api.devcode.gethired.id/todo-items', this.listItem, {
        headers,
      })
      .subscribe(() => {
        this.fetchDetailItem();
      });
  }

  updateListItem(data: any, item: number) {
    this.listItem = {
      ...data,
      activity_group_id: this.listId,
    };
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .patch(
        `https://todo.api.devcode.gethired.id/todo-items/${item}`,
        this.listItem,
        {
          headers,
        }
      )
      .subscribe((res) => {
        console.log(res);
        this.fetchDetailItem();
      });
  }

  deleteListItem(id: number) {
    this.http
      .delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
      .subscribe(() => {
        this.fetchDetailItem();
      });
  }

  private fetchDetailItem() {
    this.http.get(`${this.baseUrl}${this.listId}`).subscribe((res: any) => {
      this.newData = res;
      this.isLoading = false;
    });
   
  }

  updateActivityTitle() {
    this.updateTitle = {
      title: this.newData.title,
    };
    this.http
      .patch(`${this.baseUrl}${this.listId}`, this.updateTitle)
      .subscribe((res) => {
        console.log(res);
        console.log(this.updateTitle);
        this.editActive = false;
        this.fetchDetailItem();
      });
  }

  sortItem: any[] = [
    {
      id: 1,
      data: 'sort-latest',
      title: 'Terbaru',
      icon: 'bi bi-sort-down text-costum',
    },
    {
      id: 2,
      data: 'sort-oldest',
      title: 'Terlama',
      icon: 'bi bi-sort-up text-costum',
    },
    {
      id: 3,
      data: 'sort-az',
      title: 'A-Z',
      icon: 'bi bi-sort-alpha-down text-costum',
    },
    {
      id: 4,
      data: 'sort-za',
      title: 'Z-A',
      icon: 'bi bi-sort-alpha-down-alt text-costum',
    },
    {
      id: 5,
      data: 'sort-unfinished',
      title: 'Belum Selesai',
      icon: 'bi bi-arrow-down-up text-costum',
    },
  ];

  handleEdit() {
    this.editActive = true;
  }

  handleCheck(item: any) {
    this.listItem = {
      ...item,
      is_active: !item.is_active,
    };
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .patch(
        `https://todo.api.devcode.gethired.id/todo-items/${item.id}`,
        this.listItem,
        {
          headers,
        }
      )
      .subscribe(() => {
        this.fetchDetailItem();
      });
  }

  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }

  openModalAddList(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
