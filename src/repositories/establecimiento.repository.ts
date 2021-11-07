import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Establecimiento, EstablecimientoRelations} from '../models';

export class EstablecimientoRepository extends DefaultCrudRepository<
  Establecimiento,
  typeof Establecimiento.prototype.id,
  EstablecimientoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Establecimiento, dataSource);
  }
}
