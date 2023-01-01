import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ObjValidator<InputDto, OutputDto> {
  constructor(query: InputDto, ValidatorClass, ValidatorObj: OutputDto) {
    const mappedData = new ValidatorClass(query);
    const cleanedData = this.#removeUndefined(mappedData);

    this.data = cleanedData as OutputDto;
    this.validatorObj = ValidatorObj;
  }
  data: any;
  validatorObj: any;

  #removeUndefined(data) {
    const cleanedData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        cleanedData[key] = data[key];
      }
    });
    return cleanedData;
  }
  async validate() {
    const objInstance = plainToInstance(this.validatorObj, this.data);

    // Validate and throw errors if applicable, to be handled by controller WIP
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
}
