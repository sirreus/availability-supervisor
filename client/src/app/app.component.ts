import { Component } from '@angular/core';
import { HealthCheckService } from './services/health-check/health-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(private healthCheckService: HealthCheckService) {}
}
