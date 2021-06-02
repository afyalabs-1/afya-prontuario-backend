import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsBrPhone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isBrPhone',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return (
            typeof value === 'string' &&
            /^\((\d{2})\)\s(\d{4,5}-\d{4})$/.test(value)
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return "phone must be in the format '(aa) nnnnn-nnnn' or '(aa) nnnn-nnnn'";
        },
      },
    });
  };
}
