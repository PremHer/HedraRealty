import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import AppDataSource from '../src/data-source';
import { seedDatabase } from '../src/scripts/seed-db';

describe('API e2e', () => {
  let app: INestApplication;
  let httpServer: any;
  let projectId: string;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    process.env.DB_LOGGING = 'false';
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    await AppDataSource.dropDatabase();
    await AppDataSource.runMigrations();
    await seedDatabase(AppDataSource);
    await AppDataSource.destroy();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
      })
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    if (consoleLogSpy) {
      consoleLogSpy.mockRestore();
    }
    await app.close();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it('GET /api/companies devuelve la empresa seed', async () => {
    const response = await request(httpServer).get('/api/companies').expect(200);

    expect(response.body.total).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      name: 'Hedra Realty SAC',
      ruc: '20601234567'
    });
  });

  it('GET /api/projects devuelve el proyecto y guarda el id', async () => {
    const response = await request(httpServer).get('/api/projects').expect(200);

    expect(response.body.total).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      name: 'Residencial Luna Azul',
      type: 'lotizacion'
    });

    projectId = response.body.data[0].id;
    expect(projectId).toBeDefined();
  });

  it('GET /api/lots filtra por proyecto', async () => {
    expect(projectId).toBeDefined();

    const response = await request(httpServer)
      .get('/api/lots')
      .query({ projectId })
      .expect(200);

    expect(response.body.total).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      code: 'A-01',
      status: 'available'
    });
  });

  it('POST /api/companies crea una nueva empresa', async () => {
    const payload = {
      name: 'Hedra Realty Cusco',
      ruc: '20601234568',
      legalAddress: 'Jiron Principal 456, Cusco',
      generalManagerId: 'user-gm-2'
    };

    const createResponse = await request(httpServer)
      .post('/api/companies')
      .send(payload)
      .expect(201);

    expect(createResponse.body).toMatchObject(payload);

    const listResponse = await request(httpServer).get('/api/companies').expect(200);
    expect(listResponse.body.total).toBe(2);
  });

  it('GET /api/finance/plans devuelve los planes del proyecto', async () => {
    expect(projectId).toBeDefined();

    const response = await request(httpServer)
      .get('/api/finance/plans')
      .query({ projectId })
      .expect(200);

    expect(response.body.total).toBe(2);
    const plansResponse = response.body as { data: Array<{ name: string }>; total: number };
    const planNames = plansResponse.data.map((plan) => plan.name);
    expect(planNames).toEqual(
      expect.arrayContaining(['Plan Frances 120 cuotas', 'Venta al contado'])
    );
  });
});
