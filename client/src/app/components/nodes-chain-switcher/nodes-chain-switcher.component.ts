import { Component } from '@angular/core';

@Component({
  selector: 'app-nodes-chain-switcher',
  templateUrl: './nodes-chain-switcher.component.html',
  styleUrls: ['./nodes-chain-switcher.component.css'],
})
export class NodesChainSwitcherComponent {
  isNonEVM = true;
  toggleNode() {
    this.isNonEVM = !this.isNonEVM;
  }
}
