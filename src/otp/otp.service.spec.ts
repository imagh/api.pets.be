import { Test, TestingModule } from '@nestjs/testing';
import { OTPService } from './otp.service';
import { Model } from 'mongoose';
import { OTP, OTPDocument, OTPSchema } from './schemas/otp.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

describe('OTPService', () => {
  let service: OTPService;
  let mockOTPModel: Model<OTPDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }], "auth")
      ],
      providers: [OTPService]
    }).compile();

    service = module.get<OTPService>(OTPService);
    mockOTPModel = module.get<Model<OTPDocument>>(getModelToken(OTP.name, "auth"));
    
  });

  it('to be defined', async () => {
    console.log(mockOTPModel);
    
    expect(mockOTPModel).toBeDefined();
    console.log(service);
    
    expect(service).toBeDefined();
  });

  it('should return doc', async () => {
    const otpId = "";
    const spy = jest
      .spyOn(service, 'generate')
      .mockResolvedValue(otpId as string);
    //act
    await service.generate('register');
    console.log({ otpId });
    
    expect(spy).toHaveBeenCalled();
  })

  // describe('validateImmediately', () => {
  //   let generatedParams: {
  //     id: string;
  //     otp: string;
  //   } = { id: '', otp: '' };

  //   it('generate', async () => {
  //     let result: string = "";
  //     jest
  //       .spyOn(service, 'generate')
  //       .mockResolvedValue(generatedParams.id as string);

  //     await service.generate('registerByPhone');
  //     console.log(generatedParams);
      

  //     let otpDocument = await mockOTPModel.findOne({ id: generatedParams.id });
  //     generatedParams.otp = otpDocument.otp;
  //     // assert
  //     expect(otpDocument).toBeTruthy();
  //     expect(typeof otpDocument.otp).toBe('string');
  //     expect(otpDocument.generatedAt).toBeLessThan(Date.now());
  //     expect(otpDocument.expiryIn).toBe(600000);
  //   });

  //   it('validate', async () => {
  //     const validated = await service.validate(generatedParams.id, generatedParams.otp);
  //     let otpDocument = await mockOTPModel.findOne({ id: generatedParams.id });
  //     // assert
  //     expect(validated).toBe(true);
  //     expect(otpDocument.otp).toBe('used');
  //   });
  // })
});
