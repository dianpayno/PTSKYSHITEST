import { Component, inject, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityList } from 'src/app/model/ActivityList';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  modalService = inject(NgbModal);

  @Input() message: string = '';
  @Input() activityList: ActivityList;
  @Output() deleteActivity: EventEmitter<void> = new EventEmitter<void>();
  showAlertSuccess: boolean = false;

  delete() {
    this.deleteActivity.emit();
    this.showAlertSuccess = true;
  }
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'sm' });
    
    
  }

}
