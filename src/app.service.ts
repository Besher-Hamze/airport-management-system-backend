import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'Airport Management API',
      description: 'API for managing multiple airports with different databases',
      version: '1.0.0',
      documentation: '/api',
    };
  }

  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}