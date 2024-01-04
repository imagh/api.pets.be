class RegisterUserDTO {
  cCode: string;
  phone: string;
};

class CreateUserDTO {
  cCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

class UpdateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
};

export { RegisterUserDTO, CreateUserDTO, UpdateUserDTO };