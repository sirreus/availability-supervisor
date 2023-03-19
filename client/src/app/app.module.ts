import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NodesChainSwitcherComponent } from './components/nodes-chain-switcher/nodes-chain-switcher.component';
import { NodeInfoComponent } from './components/node-info/node-info.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NodesChainSwitcherComponent, NodeInfoComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
