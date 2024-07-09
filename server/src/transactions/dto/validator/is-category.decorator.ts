import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Category } from '@interfaces/category';

@ValidatorConstraint({ async: false })
class IsCategoryConstraint implements ValidatorConstraintInterface {
  validate(category: Category, args: ValidationArguments) {
    if (typeof category !== 'object' || !category) return false;
    if (category.hexColor === "" || category.name === "") return false;
    
    const {name, hexColor} = category as Category;
    return typeof name === 'string' && typeof hexColor === 'string';
  }

  defaultMessage(args: ValidationArguments) {
    return 'Address must contain a valid, name and hex color strings';
  }
}

export function IsCategory(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoryConstraint,
    });
  };
}