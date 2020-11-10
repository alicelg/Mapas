import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaV2Component } from './mapa-v2.component';

describe('MapaV2Component', () => {
  let component: MapaV2Component;
  let fixture: ComponentFixture<MapaV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
