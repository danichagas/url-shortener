import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import type { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shorten(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.shortenUrl(createUrlDto)
  }

  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const urlRecord = await this.urlService.getOriginalUrl(code)

    return res.redirect(HttpStatus.FOUND, urlRecord.originalUrl)
  }
}