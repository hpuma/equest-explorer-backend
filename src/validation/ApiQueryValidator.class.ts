import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ApiQueryValidator<InputDto, OutputDto> {
  constructor(query: InputDto, validatorClass, validationDto: OutputDto) {
    const mappedData = new validatorClass(query);
    const cleanedData = this.#removeUndefined(mappedData);

    this.data = cleanedData as OutputDto;
    this.validationDto = validationDto;
  }
  data: any;
  validationDto: any;

  // Validate data with validate() using validator
  async validate() {
    const objInstance = plainToInstance(this.validationDto, this.data);

    const errors = await validate(objInstance);
    if (errors.length > 0) {
      throw new TypeError(
        `Validation failed. The error fields : ${errors.map(
          ({ property }) => property,
        )}`,
      );
    }
    return objInstance;
  }

  // Private helper methods
  #removeUndefined(data: object) {
    const cleanedData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        cleanedData[key] = data[key];
      }
    });
    return cleanedData;
  }
}
