import request from 'supertest'
import app from '@/src/app'
import MongoDBConnector from '@/src/database/connector';
import configs from '@/src/config';
import { UserCreationRequestParams, HTTP_STATUS_CODE } from '@sokritha-sabaicode/ms-libs';

let createdUserId: string;

beforeAll(async () => {
  const mongodb = await MongoDBConnector.getInstance(configs.env);
  mongodb.connect({ url: configs.mongodbUrl })
})

afterAll(async () => {
  // Clean up the created user
  if (createdUserId) {
    await request(app).delete(`/v1/users/${createdUserId}`);
  }

  const mongodb = MongoDBConnector.getInstance(configs.env);
  await mongodb.disconnect();
});

describe("GET /v1/users/{userId}", () => {
  // Create a user before running the test
  beforeAll(async () => {
    const userData: UserCreationRequestParams = {
      email: 'test@example.com',
      username: 'test user',
      age: 18,
      gender: "Female"
    }

    const response = await request(app).post('/v1/users').send(userData)

    expect(response.status).toBe(HTTP_STATUS_CODE.CREATED);
    createdUserId = response.body.data._id;
  }, 20000)

  it("should return a user profile for a given userId", async () => {
    const response = await request(app).get(`/v1/users/${createdUserId}`).expect('Content-Type', /json/).expect(HTTP_STATUS_CODE.SUCCESS)

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('_id', createdUserId);
    expect(response.body.data).toHaveProperty('username', 'test user');
  }, 20000)

  it("should return 404 for a non-existent userId", async () => {
    const nonExistentUserId = '66849e01b47f6b60c073b480';
    const response = await request(app).get(`/v1/users/${nonExistentUserId}`).expect('Content-Type', /json/).expect(HTTP_STATUS_CODE.NOT_FOUND);

    expect(response.body).toHaveProperty('message', 'The requested resource was not found.');
  }, 20000);
})
