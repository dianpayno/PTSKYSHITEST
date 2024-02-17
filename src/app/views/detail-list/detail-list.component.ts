import { Component, inject, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { todoItems, ItemList } from 'src/app/model/ItemList';
import { ListItemServices } from 'src/app/Services/Listitem.services';
import { TodoServices } from 'src/app/Services/Todo.services';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent implements OnInit {
  ListItemServices: ListItemServices = inject(ListItemServices);
  TodoServices: TodoServices = inject(TodoServices);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild('inputElement') inputElement: any;


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
  listId: number;
  sortedData: todoItems[];

  focusInput() {
  this.editActive = !this.editActive;
  }



  ngOnInit() {
    this.listId = this.activeRoute.snapshot.params['id'];
    this.fetchDetailItem();
  }

  addListItem(data: any) {
    this.ListItemServices.addListItems(data, this.listId).subscribe(() => {
      this.fetchDetailItem();
    });
  }

  updateListItem(data: any, item: number) {
    this.ListItemServices.updateListItems(data, this.listId, item).subscribe(
      () => {
        this.fetchDetailItem();
      }
    );
  }

  deleteListItem(id: number) {
    this.ListItemServices.deleteListItem(id).subscribe(() => {
      this.fetchDetailItem();
    });
  }

  private fetchDetailItem() {
    this.TodoServices.fetchDetailActivity(this.listId).subscribe((res: any) => {
      this.newData = res;
      this.sortedData = [...this.newData.todo_items];
      console.log(this.sortedData);
      this.isLoading = false;
    });
  }

  updateActivityTitle() {
    this.TodoServices.updateActivity(this.newData, this.listId).subscribe(
      () => {
        this.editActive = false;
        this.fetchDetailItem();
        this.editActive = false;
      }
    );
  }

 

  updateIsCompleted(item: any) {
    this.ListItemServices.updateIsCompleted(item).subscribe(() => {
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

  activeSort(data: any, index: number) {
    this.sortItem.forEach((item) => (item.active = -1));
    data.active = index;
  }
  sortByNameAscending(data: any, index: number) {
    this.sortedData.sort((a, b) => a.title.localeCompare(b.title));
    this.activeSort(data, index);
  }
  sortByNameDescending(data: any, index: number) {
    this.activeSort(data, index);
    this.sortedData.sort((a, b) => b.title.localeCompare(a.title));
  }
  sortByIDAscending(data: any, index: number) {
    this.activeSort(data, index);
    this.sortedData.sort((a, b) => a.id - b.id);
  }

  sortByIDDescending(data: any, index: number) {
    this.activeSort(data, index);
    this.sortedData.sort((a, b) => b.id - a.id);
  }

  sortByIsCompleted(data: any, index: number) {
    this.activeSort(data, index);
    this.sortedData.sort((a: any, b: any) => b.is_active - a.is_active);
  }

  sortItem: any[] = [
    {
      id: 1,
      data: 'sort-latest',
      title: 'Terbaru',
      icon: 'bi bi-sort-down text-costum',
      click: (data: any, index: number) => this.sortByIDDescending(data, index),
      active: -1,
    },
    {
      id: 2,
      data: 'sort-oldest',
      title: 'Terlama',
      icon: 'bi bi-sort-up text-costum',
      click: (data: any, index: number) => this.sortByIDAscending(data, index),
      active: -1,
    },
    {
      id: 3,
      data: 'sort-az',
      title: 'A-Z',
      icon: 'bi bi-sort-alpha-down text-costum',
      click: (data: any, index: number) =>
        this.sortByNameAscending(data, index),
      active: -1,
    },
    {
      id: 4,
      data: 'sort-za',
      title: 'Z-A',
      icon: 'bi bi-sort-alpha-down-alt text-costum',
      click: (data: any, index: number) =>
        this.sortByNameDescending(data, index),
      active: -1,
    },
    {
      id: 5,
      data: 'sort-unfinished',
      title: 'Belum Selesai',
      icon: 'bi bi-arrow-down-up text-costum',
      click: (data: any, index: number) => this.sortByIsCompleted(data, index),
      active: -1,
    },
  ];
}
