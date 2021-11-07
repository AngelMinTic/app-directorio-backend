import {Entity, model, property} from '@loopback/repository';

@model()
export class Establecimiento extends Entity {
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
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  imagen?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
  })
  sitioWeb?: string;

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

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'date',
    required: true,
  })
  apertura: string;

  @property({
    type: 'date',
    required: true,
  })
  cierre: string;

  @property({
    type: 'string',
  })
  categoriaId?: string;

  @property({
    type: 'string',
  })
  municipioId?: string;

  constructor(data?: Partial<Establecimiento>) {
    super(data);
  }
}

export interface EstablecimientoRelations {
  // describe navigational properties here
}

export type EstablecimientoWithRelations = Establecimiento & EstablecimientoRelations;
