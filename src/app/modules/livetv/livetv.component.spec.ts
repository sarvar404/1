import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetvComponent } from './livetv.component';

describe('LivetvComponent', () => {
  let component: LivetvComponent;
  let fixture: ComponentFixture<LivetvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivetvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivetvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
