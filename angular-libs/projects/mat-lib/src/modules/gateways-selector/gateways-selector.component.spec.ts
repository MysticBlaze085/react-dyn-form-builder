import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';

import { GatewaysSelectorComponent } from './gateways-selector.component';
import { GatewaysSelectorModule } from './gateways-selector.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GatewaysSelectorComponent', () => {
  let component: GatewaysSelectorComponent;
  let fixture: ComponentFixture<GatewaysSelectorComponent>;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), NoopAnimationsModule, GatewaysSelectorModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(Store) as any;
    store.setState({ alerts: [], mutableAlerts: [], mutableAlert: undefined });

    fixture = TestBed.createComponent(GatewaysSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize gateway list values for isMulti = true', () => {
  //   const gateways = [
  //     { id: '1', name: 'Gateway 1' },
  //     { id: '2', name: 'Gateway 2' },
  //   ];
  //   store.overrideSelector(selectGatewayList, gateways as any);
  //   component.initialize(true);

  //   expect(component.inputControls).toEqual(GatewaysMultiInputControls(gateways));
  //   expect(component.form.value.gateways).toEqual(['all']);
  //   expect(component.valueChanges.emit).toHaveBeenCalledWith({ gateways: ['all'] });
  // });

  // it('should initialize gateway list values for isMulti = false', () => {
  //   const gateways = [
  //     { id: '1', name: 'Gateway 1' },
  //     { id: '2', name: 'Gateway 2' },
  //   ];
  //   store.overrideSelector(selectGatewayList, gateways as any);
  //   component.initialize(false);

  //   expect(component.inputControls).toEqual(GatewaysInputControls(gateways));
  //   expect(component.form.value.gateways).toEqual('1');
  //   expect(component.valueChanges.emit).toHaveBeenCalledWith({ gateways: '1' });
  // });

  it('should update gatewayValue and form when ngOnChanges is called', () => {
    const changes = {
      isMulti: {
        currentValue: true,
      },
      gatewayValue: {
        currentValue: ['all'],
      },
    } as any;

    component.form.get('gateways')?.patchValue(['all']);
    component.ngOnChanges(changes);

    expect(component.gatewayValue).toEqual(['all']);
    expect(component.form.get('gateways')?.value).toEqual(['all']);
  });

  it('should update form and emit valueChanges when onValueChanges is called', () => {
    const event = { gateways: ['all'] };

    spyOn(component.form, 'patchValue');
    spyOn(component.valueChanges, 'emit');
    component.onValueChanges(event);

    expect(component.form.patchValue).toHaveBeenCalledWith(event);
    expect(component.valueChanges.emit).toHaveBeenCalledWith(event);
  });
});
