import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class GlobalValidator {
  // Validate data with validate() using validator
  async validate<T>(
    data: any,
    validationClass: ClassConstructor<T>,
  ): Promise<T> {
    const mappedData = new validationClass(data);

    const instanceData = plainToInstance(validationClass, mappedData, {
      exposeUnsetFields: false,
    }) as any;

    const errors = await validate(instanceData);

    if (errors.length > 0) {
      throw new TypeError(
        `VALIDATION ERROR: ${errors.map((error) => error.toString())}`,
      );
    }
    // console.log('[VALIDATE] - GlobalValidator - ', validationClass);
    return instanceData;
  }
}
