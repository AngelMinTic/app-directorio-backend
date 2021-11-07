import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Establecimiento} from '../models';
import {EstablecimientoRepository} from '../repositories';

export class EstablecimientoController {
  constructor(
    @repository(EstablecimientoRepository)
    public establecimientoRepository : EstablecimientoRepository,
  ) {}

  @post('/establecimientos')
  @response(200, {
    description: 'Establecimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Establecimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {
            title: 'NewEstablecimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    establecimiento: Omit<Establecimiento, 'id'>,
  ): Promise<Establecimiento> {
    return this.establecimientoRepository.create(establecimiento);
  }

  @get('/establecimientos/count')
  @response(200, {
    description: 'Establecimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Establecimiento) where?: Where<Establecimiento>,
  ): Promise<Count> {
    return this.establecimientoRepository.count(where);
  }

  @get('/establecimientos')
  @response(200, {
    description: 'Array of Establecimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Establecimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Establecimiento) filter?: Filter<Establecimiento>,
  ): Promise<Establecimiento[]> {
    return this.establecimientoRepository.find(filter);
  }

  @patch('/establecimientos')
  @response(200, {
    description: 'Establecimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {partial: true}),
        },
      },
    })
    establecimiento: Establecimiento,
    @param.where(Establecimiento) where?: Where<Establecimiento>,
  ): Promise<Count> {
    return this.establecimientoRepository.updateAll(establecimiento, where);
  }

  @get('/establecimientos/{id}')
  @response(200, {
    description: 'Establecimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Establecimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Establecimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Establecimiento>
  ): Promise<Establecimiento> {
    return this.establecimientoRepository.findById(id, filter);
  }

  @patch('/establecimientos/{id}')
  @response(204, {
    description: 'Establecimiento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {partial: true}),
        },
      },
    })
    establecimiento: Establecimiento,
  ): Promise<void> {
    await this.establecimientoRepository.updateById(id, establecimiento);
  }

  @put('/establecimientos/{id}')
  @response(204, {
    description: 'Establecimiento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() establecimiento: Establecimiento,
  ): Promise<void> {
    await this.establecimientoRepository.replaceById(id, establecimiento);
  }

  @del('/establecimientos/{id}')
  @response(204, {
    description: 'Establecimiento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.establecimientoRepository.deleteById(id);
  }
}
