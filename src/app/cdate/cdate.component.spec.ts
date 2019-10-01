import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdateComponent } from './cdate.component';

describe('CdateComponent', () => {
  let component: CdateComponent;
  let fixture: ComponentFixture<CdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
