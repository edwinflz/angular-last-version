import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiobookCardComponent } from './audiobook-card.component';

describe('AudiobookCardComponent', () => {
  let component: AudiobookCardComponent;
  let fixture: ComponentFixture<AudiobookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AudiobookCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiobookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
