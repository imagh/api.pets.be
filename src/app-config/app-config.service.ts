import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppConfig } from './schemas/app-config.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppConfigService {
  constructor(
    @InjectModel(AppConfig.name, "conf")
    private readonly appConfigModel: Model<AppConfig>
  ) {}

  async get(name: string): Promise<{ [key: string]: any }> {
    const conf = await this.appConfigModel.findOne({ name }).exec();
    return conf.conf;
  }

  async update(name: string, conf: { [key: string]: any }): Promise<any> {
    let existingConf: { [key: string]: any } = await this.get(name) || {};
    let updatedConf: { [key: string]: any } = Object.assign({}, existingConf, conf);
    return this.appConfigModel
      .findOneAndUpdate({
        name
      }, {
        $set: updatedConf
      }, {
        upsert: true,
        returnDocument: 'after'
      })
      .exec();
  }
}
