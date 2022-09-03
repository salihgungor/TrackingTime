import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraDetailComponent } from './cra-detail.component';

describe('CraDetailComponent', () => {
  let component: CraDetailComponent;
  let fixture: ComponentFixture<CraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
