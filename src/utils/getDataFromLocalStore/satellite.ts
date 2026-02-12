import { Satellite } from '../../api/satellites';

export function getSatellite(): Satellite {
  const satellite = localStorage.getItem('satellite')
  return satellite ? JSON.parse(satellite) : null
}

export function saveSatellite(data: Satellite) {
  localStorage.setItem('satellite', JSON.stringify(data))
}
