import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { WeatherService } from '../weather.service';
import { City } from '../classes';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.initializeMap();
    this.getAndDisplayWeatherData();
  }

  initializeMap(): void {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=HwKnhMSyx0v949XXUCkA',
      center: [0, 0],
      zoom: 1
    });
  }

  async getAndDisplayWeatherData(): Promise<void> {
    try {
      this.weatherService.getWeather().subscribe(weatherData => { this.updateMapWithWeatherData(weatherData) });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  updateMapWithWeatherData(weatherData: City): void {
    if (weatherData && weatherData.features) {
      weatherData.features.forEach(city => {
        console.log(city);

        const [lng, lat] = city.geometry.coordinates; // Extract longitude and latitude
        const temperature = city.properties.temperature; // Get the temperature
        const marker = new maplibregl.Marker()
          .setLngLat([lng, lat]) // Convert to array with two elements
          .addTo(this.map)
          .setPopup(new maplibregl.Popup().setHTML(`<p>Temperature: ${temperature}°C</p>`)); // Add popup with temperature
      });
    } else {
      console.error('Weather data or features are missing.');
    }
  }


  refreshMap(): void {
    this.getAndDisplayWeatherData();
  }

  async addSite(city: string, lat: number, lng: number) {
    const newCity = {
      name: city,
      location: { lat: lat, lon: lng },
      temperature: 3.3
    };
    await this.weatherService.addSite(newCity).subscribe(response => {
      console.log(response);
    });
  }

}