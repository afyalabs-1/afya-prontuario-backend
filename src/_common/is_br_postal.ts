import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';

function validateBrPostalCode(state: string) {
  return /^\d{5}-\d{3}$/.test(state);
}

export function IsBrPostalCode(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isBrPostalCode',
      target: object.constructor,
      propertyName,
      constraints: ['Invalid Brazilian postal code format'],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validateBrPostalCode(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'invalid Brazilian postal code format';
        },
      },
    });
  };
}
