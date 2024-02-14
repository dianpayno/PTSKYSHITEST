import { Component, inject, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true, size: 'md' });
	}

}
