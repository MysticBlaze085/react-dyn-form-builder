import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSideDrawerComponent } from './modal-side-drawer.component';
import { ModalSideDrawerModule } from './modal-side-drawer.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalSideDrawerComponent', () => {
  let component: ModalSideDrawerComponent;
  let fixture: ComponentFixture<ModalSideDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ModalSideDrawerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
