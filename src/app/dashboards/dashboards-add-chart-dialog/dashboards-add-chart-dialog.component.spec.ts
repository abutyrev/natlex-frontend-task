import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsAddChartDialogComponent } from './dashboards-add-chart-dialog.component';

describe('DashboardsAddChartDialogComponent', () => {
  let component: DashboardsAddChartDialogComponent;
  let fixture: ComponentFixture<DashboardsAddChartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsAddChartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsAddChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
