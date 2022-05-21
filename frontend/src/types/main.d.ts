interface Station {
  code: string;
  name: string;
  shortCode: string;
}

interface StationsResponse {
  stations: Station[]
}

interface Destination {
  $: {
    etarr: string;
    name: string;
    ttarr: string;
  }
}

interface CallingPoint {
  $: {
    Name: string;
    etarr: string;
    etdep: string;
    ttarr: string;
    ttdep: string;
  }
}

interface Service {
  DepartTime: { $: { time: string } };
  ServiceStatus: { $: { Status: string } };
  Dest1CallingPoints: {
    CallingPoint: CallingPoint[];
  }
  Destination1: Destination;
}

interface StationTimetable {
  StationBoard: {
    Service: Service[] | Service;
  };
}
