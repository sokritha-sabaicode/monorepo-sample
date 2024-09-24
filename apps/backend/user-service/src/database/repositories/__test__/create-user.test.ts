import MongoDBConnector from '@/src/database/connector';
import UserRepository from '@/src/database/repositories/user.repository';
import configs from '@/src/config';
import { InvalidInputError, ResourceConflictError } from '@sokritha-sabaicode/ms-libs';

let createdUserId;

beforeAll(async () => {
  const mongodb = await MongoDBConnector.getInstance(configs.env);
  mongodb.connect({ url: configs.mongodbUrl })
})

afterAll(async () => {
  await UserRepository.deleteById(createdUserId! as string)
  const mongodb = MongoDBConnector.getInstance(configs.env);
  await mongodb.disconnect();
});

describe("UserRepository - Create User", () => {
  it("should create a user and retrieve it", async () => {
    const userData = { email: 'test1@example.com', username: 'testuser', age: 25, gender: 'Female' };
    const createdUser = await UserRepository.create(userData);
    createdUserId = createdUser._id;

    expect(createdUser.email).toEqual('test1@example.com');

    const retrievedUser = await UserRepository.findById(createdUser._id.toString());
    expect(retrievedUser.username).toEqual('testuser');
  }, 20000)

  it("should handle validation errors when creating a user with invalid data", async () => {
    const invalidUserData = { email: 'invalidemail', username: '', age: 17, gender: 'Unknown' };  // Assuming these are invalid based on schema validations

    try {
      await UserRepository.create(invalidUserData);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty('errors');
    }
  }, 20000);

  it("should throw a ResourceConflictError for duplicate email", async () => {
    const userData = { email: 'duplicate@example.com', username: 'testuser', age: 25, gender: 'Female' };

    await UserRepository.create(userData);  // First insertion
    await expect(UserRepository.create(userData)).rejects.toThrow(ResourceConflictError);  // Second insertion should fail
  }, 20000);
})
