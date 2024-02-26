import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerMockComponent } from './swagger-mock.component';

describe('SwaggerMockComponent', () => {
  let component: SwaggerMockComponent;
  let fixture: ComponentFixture<SwaggerMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwaggerMockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwaggerMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
