class RegisterUserDTO {
  cCode: string;
  phone: string;
  phoneVerified: Boolean;
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

class MarkPhoneVerified {
  phoneVerified: Boolean;
}

export { RegisterUserDTO, CreateUserDTO, UpdateUserDTO, MarkPhoneVerified };