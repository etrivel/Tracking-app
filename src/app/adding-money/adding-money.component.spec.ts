import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingMoneyComponent } from './adding-money.component';

describe('AddingMoneyComponent', () => {
  let component: AddingMoneyComponent;
  let fixture: ComponentFixture<AddingMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
