import { Component, inject, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemList } from 'src/app/model/ItemList';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent {
  editActive: boolean = false;
  titleAddList: string = 'Tambah List Item';
  titleEditList: string = 'Edit  List Item';
  activity: string = 'Meeting dengan Client';
  message: string = 'Apakah anda yakin menghapus list item';
  newData: ItemList;
 

  todoList: ItemList[] = [];

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

  handleActivityChange() {
    console.log(this.activity);
    this.editActive = false;
  }

  handleCheck(item: any) {
    item.is_active= !item.is_active;
  }

  addNewList(data:ItemList) {
    this.newData = {
      ...data,
      is_active: false,
    }
    this.todoList.push(this.newData);
    console.log(this.newData)
  }

  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }

  openModalAddList(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
