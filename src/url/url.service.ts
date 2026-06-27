import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlService {
    constructor(
      @InjectModel(Url.name) private urlModel: Model<Url>,
    ) {}

    async shortenUrl(createUrlDto: CreateUrlDto): Promise<Url> {
      const { nanoid } = await import('nanoid')
      const shortCode = nanoid(6)

      const newUrl = new this.urlModel({
        originalUrl: createUrlDto.originalUrl,
        shortCode
      })

      return newUrl.save()
    }

    async getOriginalUrl(shortCode: string): Promise<Url> {
      const urlRecord = await this.urlModel.findOne({ shortCode }).exec()

      if (!urlRecord) {
        throw new NotFoundException('Short URL not found')
      }

      return urlRecord
    }
}