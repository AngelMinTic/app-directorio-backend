import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Establecimiento} from '../models';
import {EstablecimientoRepository} from './establecimiento.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly establecimientos: HasManyRepositoryFactory<Establecimiento, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstablecimientoRepository') protected establecimientoRepositoryGetter: Getter<EstablecimientoRepository>,
  ) {
    super(Categoria, dataSource);
    this.establecimientos = this.createHasManyRepositoryFactoryFor('establecimientos', establecimientoRepositoryGetter,);
    this.registerInclusionResolver('establecimientos', this.establecimientos.inclusionResolver);
  }
}
