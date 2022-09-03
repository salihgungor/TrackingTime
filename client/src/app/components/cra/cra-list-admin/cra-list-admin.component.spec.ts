import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraListAdminComponent } from './cra-list-admin.component';

describe('CraListAdminComponent', () => {
  let component: CraListAdminComponent;
  let fixture: ComponentFixture<CraListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
