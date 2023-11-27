// weather.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WeatherService } from '../../services/weather.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
})
export class WeatherComponent implements OnInit {
  identifier: string = '';
  temperatures: number[] = [];
  chart: Chart | undefined;

  constructor(private weatherService: WeatherService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.identifier = this.parseIdentifierFromUrl();
    this.fetchWeatherData();
    this.createChart();

  }

  private parseIdentifierFromUrl(): string {
    const urlParts = window.location.pathname.split('/');
    return urlParts[2];
  }

  private fetchWeatherData(): void {
    this.httpClient.get<any>('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
      .subscribe(data => {
        this.extractTemperatures(data);
        this.createChart();
      });
  }

  private extractTemperatures(data: any): void {
    const properties = data.properties.periods[0].propertyValues;
    for (const property of properties) {
      if (property.type === 'temperature') {
        this.temperatures.push(property.value);
      }
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('weatherChart') as HTMLCanvasElement | null;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperature',
            data: this.temperatures,
            borderColor: '#007bff',
            backgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxis: {
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            }
          }
        }
      });
    } else {
      console.log('Canvas element with id "weatherChart" not found.');
    }
  }
}
