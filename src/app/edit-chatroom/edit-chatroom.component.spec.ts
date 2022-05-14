import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatroomComponent } from './edit-chatroom.component';

describe('EditChatroomComponent', () => {
  let component: EditChatroomComponent;
  let fixture: ComponentFixture<EditChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChatroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
