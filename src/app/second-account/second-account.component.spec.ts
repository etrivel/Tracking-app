import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondAccountComponent } from './second-account.component';

describe('SecondAccountComponent', () => {
  let component: SecondAccountComponent;
  let fixture: ComponentFixture<SecondAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
