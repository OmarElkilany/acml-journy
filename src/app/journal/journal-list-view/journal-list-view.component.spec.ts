import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalListView } from './journal-list-view.component';

describe('SearchComponent', () => {
  let component: JournalListView;
  let fixture: ComponentFixture<JournalListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
