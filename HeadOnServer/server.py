from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import List, Dict

from config import API_KEY, CITIES, ORIGINS
from models import City


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def fetch_weather(city_name: str) -> float:
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    temperature = data["main"]["temp"]
    return temperature

def update_weather():
    for city_name, city_data in CITIES.items():
        temperature = fetch_weather(city_name)
        city_data["temperature"] = temperature

@app.get("/weather-sites")
async def get_weather_sites():
    features = []
    for city_name, city_data in CITIES.items():
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [city_data["lon"], city_data["lat"]]
            },
            "properties": {
                "city": city_name,
                "temperature": fetch_weather(city_name)
            }
        }
        features.append(feature)

    return {"type": "FeatureCollection", "features": features}


@app.post("/refresh-weather")
async def refresh_weather(background_tasks: BackgroundTasks):
    background_tasks.add_task(update_weather)
    return {"message": "Weather data is being refreshed in the background"}


@app.post("/add-site")
async def add_site(city: City):
    if city.name in CITIES:
        raise HTTPException(status_code=400, detail="City already exists")
    CITIES[city.name] = {"lat": city.location["lat"], "lon": city.location["lon"]}
    return {"message": "City added successfully", "city": city.name}