import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ApiQueryValidator {
  constructor(query) {
    this.query = query;
  }

  query: any;

  // Validate data with validate() using validator
  async validate(ValidationClass: ClassConstructor<any>) {
    const mappedQuery = new ValidationClass(this.query);

    this.query = plainToInstance(ValidationClass, mappedQuery, {
      exposeUnsetFields: false,
    });
    const errors = await validate(this.query);
    if (errors.length > 0) {
      throw new TypeError(
        `Validation failed. The error fields : ${errors.map(
          ({ property }) => property,
        )}`,
      );
    }

    return this.query;
  }
}
