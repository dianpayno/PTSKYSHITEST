import { Component, inject, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  modalService = inject(NgbModal);
  activity: string = 'Meeting dengan Client';

  @Input() message: string = '';
}
