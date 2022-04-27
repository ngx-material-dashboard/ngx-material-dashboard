import { Attribute, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { Book } from './book.model';

@JsonApiModelConfig({
  type: 'crimeBooks',
  modelEndpointUrl: 'books'
})
export class CrimeBook extends Book {

  @Attribute()
  ageLimit?: number;
}
