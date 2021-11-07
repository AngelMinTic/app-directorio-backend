import {Entity, model, property, hasMany} from '@loopback/repository';
import {Establecimiento} from './establecimiento.model';

@model()
export class Municipio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  latitud: number;

  @property({
    type: 'number',
    required: true,
  })
  longitud: number;

  @hasMany(() => Establecimiento)
  establecimientos: Establecimiento[];

  constructor(data?: Partial<Municipio>) {
    super(data);
  }
}

export interface MunicipioRelations {
  // describe navigational properties here
}

export type MunicipioWithRelations = Municipio & MunicipioRelations;
