import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAngMatComponent } from './ngx-ang-mat.component';

describe('NgxAngMatComponent', () => {
  let component: NgxAngMatComponent;
  let fixture: ComponentFixture<NgxAngMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAngMatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAngMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
