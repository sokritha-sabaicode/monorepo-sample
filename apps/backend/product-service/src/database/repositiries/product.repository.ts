// src/repositories/product.repository.ts
import ItemModel, { IItem } from '@/src/database/models/product.model';
import { ProductCreateRequest, ProductUpdateRequest } from '@/src/controllers/types/user-request.type';

class ProductRepository {
  public async createProduct(productRequest: ProductCreateRequest): Promise<IItem> {
    try {
      const newProduct = await ItemModel.create(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(id: string): Promise<IItem | null> {
    try {
      const product = await ItemModel.findById(id);
      if (!product) {
        throw new Error('Product not found!')
      }

      return product;
    } catch (error) {
      throw error;
    }
  }


  // public async getProductAll(): Promise<IItem[] | null> {
  //   try {
  //     const product = await ItemModel.find();
  //     if (!product) {
  //       throw new Error('Product not found!')
  //     }

  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async updateProduct(id: string, productRequest: ProductUpdateRequest): Promise<IItem | null> {
    try {
      const updatedProduct = await ItemModel.findByIdAndUpdate(id, productRequest, { new: true });

      if (!updatedProduct) {
        throw new Error('Product not found!')
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
    public async deleteProduct(id: string): Promise<IItem | null> {
    try {
      const deleteProduct = await ItemModel.findByIdAndDelete(id);
  
      if (!deleteProduct) {
        throw new Error('Product not found!')
      }
  
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }

  // page =1 , limit =3 => 1 , 2, 3
  // page = 2, limit =3 => 4, 5, 6
  
  public async getAllProducts(page: number, limit: number): Promise<IItem[] | null> {
    try {
      const products = await ItemModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
        
        
      if (!products || products.length === 0) {
        throw new Error('Products not found!');
      }

      return products;
    } catch (error) {
      throw error;
    }
  }
}


  // Add more repository methods as needed


export default new ProductRepository();