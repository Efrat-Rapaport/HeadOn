export class City {
    type: string;
    features: Feature[];

    constructor(type: string, features: Feature[]) {
        this.type = type;
        this.features = features;
    }
}

export class Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;

    constructor(type: string, geometry: Geometry, properties: Properties) {
        this.type = type;
        this.geometry = geometry;
        this.properties = properties;
    }
}

export class Geometry {
    type: string;
    coordinates: number[];

    constructor(type: string, coordinates: number[]) {
        this.type = type;
        this.coordinates = coordinates;
    }
}

export class Properties {
    city: string;
    temperature: number;

    constructor(city: string, temperature: number) {
        this.city = city;
        this.temperature = temperature;
    }
}
