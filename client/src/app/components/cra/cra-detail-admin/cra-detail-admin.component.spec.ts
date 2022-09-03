import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraDetailAdminComponent } from './cra-detail-admin.component';

describe('CraDetailAdminComponent', () => {
  let component: CraDetailAdminComponent;
  let fixture: ComponentFixture<CraDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraDetailAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
