import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeFamComponent } from './groupe-fam.component';

describe('GroupeFamComponent', () => {
  let component: GroupeFamComponent;
  let fixture: ComponentFixture<GroupeFamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeFamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeFamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
