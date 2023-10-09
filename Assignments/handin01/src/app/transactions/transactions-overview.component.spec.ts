import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOverviewComponent } from './transactions-overview.component';

describe('TransactionsComponent', () => {
  let component: TransactionsOverviewComponent;
  let fixture: ComponentFixture<TransactionsOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsOverviewComponent]
    });
    fixture = TestBed.createComponent(TransactionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
