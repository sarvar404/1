import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportstvComponent } from './sportstv.component';

describe('SportstvComponent', () => {
  let component: SportstvComponent;
  let fixture: ComponentFixture<SportstvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportstvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportstvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
