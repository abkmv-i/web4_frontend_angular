import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesListComponent } from './coordinates-list.component';

describe('CoordinatesListComponent', () => {
  let component: CoordinatesListComponent;
  let fixture: ComponentFixture<CoordinatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
