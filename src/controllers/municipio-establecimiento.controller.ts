import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Municipio,
  Establecimiento,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioEstablecimientoController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Establecimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Establecimiento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Establecimiento>,
  ): Promise<Establecimiento[]> {
    return this.municipioRepository.establecimientos(id).find(filter);
  }

  @post('/municipios/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Establecimiento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {
            title: 'NewEstablecimientoInMunicipio',
            exclude: ['id'],
            optional: ['municipioId']
          }),
        },
      },
    }) establecimiento: Omit<Establecimiento, 'id'>,
  ): Promise<Establecimiento> {
    return this.municipioRepository.establecimientos(id).create(establecimiento);
  }

  @patch('/municipios/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Municipio.Establecimiento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {partial: true}),
        },
      },
    })
    establecimiento: Partial<Establecimiento>,
    @param.query.object('where', getWhereSchemaFor(Establecimiento)) where?: Where<Establecimiento>,
  ): Promise<Count> {
    return this.municipioRepository.establecimientos(id).patch(establecimiento, where);
  }

  @del('/municipios/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Municipio.Establecimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Establecimiento)) where?: Where<Establecimiento>,
  ): Promise<Count> {
    return this.municipioRepository.establecimientos(id).delete(where);
  }
}
