import {
  Component,
  Input,
  OnInit,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemList, todoItems } from 'src/app/model/ItemList';

@Component({
  selector: 'app-addlist-modal',
  templateUrl: './addlist-modal.component.html',
  styleUrls: ['./addlist-modal.component.css'],
})
export class AddlistModalComponent implements OnInit {
  @Input() title: string;
  @Input() data: todoItems;
  @Output() emitList: EventEmitter<ItemList> = new EventEmitter<ItemList>();

  modalService = inject(NgbModal);
  submitListForm: FormGroup;
  selectedOption: string;
  activity: string;
  options = [
    { label: 'Very High', value: 'very-high', data:'modal-add-priority-very-high' },
    { label: 'High', value: 'high', data:'modal-add-priority-high' },
    { label: 'Medium', value: 'normal', data:'modal-add-priority-medium' },
    { label: 'Low', value: 'low', data:'modal-add-priority-low' },
    { label: 'Very Low', value: 'very-low', data:'modal-add-priority-very-low' },
  ];

  ngOnInit(): void {
    this.submitListForm = new FormGroup({
      title: new FormControl(this.data.title, Validators.required),
      priority: new FormControl(this.data.priority ),
    });
  }

  submit() {
    this.emitList.emit(this.submitListForm.value);
    this.submitListForm.reset();
    this.modalService.dismissAll();
  }
}
