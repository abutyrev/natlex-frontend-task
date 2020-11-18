import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsChartComponent } from './dashboards-chart.component';

describe('DashboardsChartComponent', () => {
  let component: DashboardsChartComponent;
  let fixture: ComponentFixture<DashboardsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
