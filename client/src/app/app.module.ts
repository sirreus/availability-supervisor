import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NodesChainSwitcherComponent } from './components/nodes-chain-switcher/nodes-chain-switcher.component';
import { NodeInfoComponent } from './components/node-info/node-info.component';
import { HealthCheckService } from './services/health-check/health-check.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NodesChainSwitcherComponent,
    NodeInfoComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [HealthCheckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
