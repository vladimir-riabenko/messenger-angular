import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChatroomsComponent } from './all-chatrooms.component';

describe('AllChatroomsComponent', () => {
  let component: AllChatroomsComponent;
  let fixture: ComponentFixture<AllChatroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllChatroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChatroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
