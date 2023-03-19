import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesChainSwitcherComponent } from './nodes-chain-switcher.component';

describe('NodesChainSwitcherComponent', () => {
  let component: NodesChainSwitcherComponent;
  let fixture: ComponentFixture<NodesChainSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesChainSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodesChainSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
