import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';

const brazilStates = [
  { value: 'AC', name: 'Acre' },
  { value: 'AL', name: 'Alagoas' },
  { value: 'AM', name: 'Amazonas' },
  { value: 'AP', name: 'Amapá' },
  { value: 'BA', name: 'Bahia' },
  { value: 'CE', name: 'Ceará' },
  { value: 'DF', name: 'Distrito Federal' },
  { value: 'ES', name: 'Espírito Santo' },
  { value: 'GO', name: 'Goiás' },
  { value: 'MA', name: 'Maranhão' },
  { value: 'MG', name: 'Minas Gerais' },
  { value: 'MS', name: 'Mato Grosso do Sul' },
  { value: 'MT', name: 'Mato Grosso' },
  { value: 'PA', name: 'Pará' },
  { value: 'PB', name: 'Paraíba' },
  { value: 'PE', name: 'Pernambuco' },
  { value: 'PI', name: 'Piauí' },
  { value: 'PR', name: 'Paraná' },
  { value: 'RJ', name: 'Rio de Janeiro' },
  { value: 'RN', name: 'Rio Grande do Norte' },
  { value: 'RO', name: 'Rondônia' },
  { value: 'RR', name: 'Roraima' },
  { value: 'RS', name: 'Rio Grande do Sul' },
  { value: 'SC', name: 'Santa Catarina' },
  { value: 'SE', name: 'Sergipe' },
  { value: 'SP', name: 'São Paulo' },
  { value: 'TO', name: 'Tocantins' },
];

function validateBrState(state: string) {
  return brazilStates.map(brazilState => brazilState.value).includes(state);
}

export function IsBrState(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isBrState',
      target: object.constructor,
      propertyName,
      constraints: ['Invalid Brazilian state'],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validateBrState(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'invalid Brazilian state';
        },
      },
    });
  };
}
