import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditClientComponent } from './add-and-edit-client.component';

describe('AjouterClientComponent', () => {
  let component: AddAndEditClientComponent;
  let fixture: ComponentFixture<AddAndEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAndEditClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
