import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class GlobalValidator<T> {
  data: any;
  validationClass: ClassConstructor<T>;

  constructor(data: any, validationClass: ClassConstructor<T>) {
    this.validationClass = validationClass;
    this.data = data;
  }

  // Validate data with validate() using validator
  async validate(): Promise<T> {
    const mappedData = new this.validationClass(this.data);

    this.data = plainToInstance(this.validationClass, mappedData, {
      exposeUnsetFields: false,
    });

    const errors = await validate(this.data);

    if (errors.length > 0) {
      throw new TypeError(`${errors.map((error) => error.toString())}`);
    }

    return this.data;
  }
}
