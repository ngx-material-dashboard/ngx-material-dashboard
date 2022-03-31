import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';
import { Book } from './book.model';

@JsonApiModelConfig({
  type: 'crimeBooks',
  modelEndpointUrl: 'books'
})
export class CrimeBook extends Book {

  @Attribute()
  ageLimit?: number;
}
