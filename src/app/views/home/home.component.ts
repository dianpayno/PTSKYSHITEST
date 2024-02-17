import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/model/Activity';
import { TodoServices } from 'src/app/Services/Todo.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todoService: TodoServices = inject(TodoServices);
  private modalService: NgbModal = inject(NgbModal);
  message: string = 'Apakah anda yakin menghapus activity';
  activityList: any[];
  loading: boolean = true;

  ngOnInit(): void {
    this.fetchActivity();
  }

  addNewActivity() {
    this.todoService.addNewActivity().subscribe(() => {
      this.fetchActivity();
    });
  }

  deleteActivity(id: number) {
    this.todoService.deleteActivity(id).subscribe(() => {
      this.fetchActivity();
    });
  }

  private fetchActivity() {
    this.todoService.fetchActivity().subscribe((res: any) => {
      this.activityList = res.data;
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
}
