import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDurationComponent } from './confirm-dialog.component';



describe('ConfirmDurationComponent', () => {
  let component: ConfirmDurationComponent;
  let fixture: ComponentFixture<ConfirmDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
