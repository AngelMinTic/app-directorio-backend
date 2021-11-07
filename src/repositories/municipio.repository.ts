import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Municipio, MunicipioRelations, Establecimiento} from '../models';
import {EstablecimientoRepository} from './establecimiento.repository';

export class MunicipioRepository extends DefaultCrudRepository<
  Municipio,
  typeof Municipio.prototype.id,
  MunicipioRelations
> {

  public readonly establecimientos: HasManyRepositoryFactory<Establecimiento, typeof Municipio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstablecimientoRepository') protected establecimientoRepositoryGetter: Getter<EstablecimientoRepository>,
  ) {
    super(Municipio, dataSource);
    this.establecimientos = this.createHasManyRepositoryFactoryFor('establecimientos', establecimientoRepositoryGetter,);
    this.registerInclusionResolver('establecimientos', this.establecimientos.inclusionResolver);
  }
}
