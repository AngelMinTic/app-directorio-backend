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
  Categoria,
  Establecimiento,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaEstablecimientoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Establecimiento',
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
    return this.categoriaRepository.establecimientos(id).find(filter);
  }

  @post('/categorias/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Establecimiento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Establecimiento, {
            title: 'NewEstablecimientoInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) establecimiento: Omit<Establecimiento, 'id'>,
  ): Promise<Establecimiento> {
    return this.categoriaRepository.establecimientos(id).create(establecimiento);
  }

  @patch('/categorias/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Categoria.Establecimiento PATCH success count',
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
    return this.categoriaRepository.establecimientos(id).patch(establecimiento, where);
  }

  @del('/categorias/{id}/establecimientos', {
    responses: {
      '200': {
        description: 'Categoria.Establecimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Establecimiento)) where?: Where<Establecimiento>,
  ): Promise<Count> {
    return this.categoriaRepository.establecimientos(id).delete(where);
  }
}
