import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatssapChatComponent } from './whatssap-chat.component';

describe('WhatssapChatComponent', () => {
  let component: WhatssapChatComponent;
  let fixture: ComponentFixture<WhatssapChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatssapChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatssapChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
