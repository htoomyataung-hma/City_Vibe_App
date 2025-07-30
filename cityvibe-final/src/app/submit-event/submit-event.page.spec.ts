import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitEventPage } from './submit-event.page';

describe('SubmitEventPage', () => {
  let component: SubmitEventPage;
  let fixture: ComponentFixture<SubmitEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
