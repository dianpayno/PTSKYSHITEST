import { Component, Input, OnInit, Output, inject , EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemList } from 'src/app/model/ItemList';

@Component({
  selector: 'app-addlist-modal',
  templateUrl: './addlist-modal.component.html',
  styleUrls: ['./addlist-modal.component.css'],
})
export class AddlistModalComponent implements OnInit {
  @Input() title: string;
  @Output() emitList:EventEmitter<ItemList> = new EventEmitter<ItemList>();
  modalService = inject(NgbModal);
  submitListForm: FormGroup;
  selectedOption: string;
  activity: string;
  options = [
    { label: 'Very High', value: 'very_high' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
    { label: 'Very Low', value: 'very_low' },
  ];

  ngOnInit(): void {
    this.submitListForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      priority: new FormControl('very_high'),
    });
  }

  submit() {
    this.emitList.emit(this.submitListForm.value);
    this.submitListForm.reset();
    this.modalService.dismissAll()

  }

  getColor(optionValue: string): string {
    if (optionValue === 'very_high') {
      return 'red';
    } else if (optionValue === 'very_low') {
      return 'yellow';
    } else {
      return 'black'; // Warna default jika tidak sesuai kondisi
    }
  }
}
