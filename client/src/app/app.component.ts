import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './services/health-check/health-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private healthCheckService: HealthCheckService) {}
  ngOnInit() {
    this.healthCheck();
  }

  healthCheck() {
    const result = this.healthCheckService.check();
    console.log(result);
  }
}
