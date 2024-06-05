from typing import Dict
from pydantic import BaseModel

class City(BaseModel):
    name: str
    location: Dict[str, float]
    temperature: float