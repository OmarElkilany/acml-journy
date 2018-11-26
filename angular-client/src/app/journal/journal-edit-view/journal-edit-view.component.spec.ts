import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEditViewComponent } from './journal-edit-view.component';

describe('JournalEditViewComponent', () => {
  let component: JournalEditViewComponent;
  let fixture: ComponentFixture<JournalEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
