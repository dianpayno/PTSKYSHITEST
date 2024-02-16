import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlistModalComponent } from './addlist-modal.component';

describe('AddlistModalComponent', () => {
  let component: AddlistModalComponent;
  let fixture: ComponentFixture<AddlistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddlistModalComponent]
    });
    fixture = TestBed.createComponent(AddlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
