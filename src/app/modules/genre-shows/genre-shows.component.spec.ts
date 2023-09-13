import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreShowsComponent } from './genre-shows.component';

describe('GenreShowsComponent', () => {
  let component: GenreShowsComponent;
  let fixture: ComponentFixture<GenreShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
