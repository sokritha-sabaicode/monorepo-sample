// src/services/product.service.ts
import { ProductCreateRequest, ProductUpdateRequest } from '@/src/controllers/types/user-request.type';
import { IItem } from '@/src/database/models/product.model';
import productRepository from '@/src/database/repositiries/product.repository';
import ProductRepository from '@/src/database/repositiries/product.repository';



export class ProductService {
  public async createProduct(productRequest: ProductCreateRequest): Promise<IItem> {
    try {
      const newProduct = await ProductRepository.createProduct(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  
  public async getProductById(id: string): Promise<IItem | null> {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // public async getProductAll(): Promise<IItem[] | null> {
  //   try {
  //     const product = await ProductRepository.getProductAll();
  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  

  public async updateProduct(id: string, productRequest: ProductUpdateRequest): Promise<IItem | null> {
    try {
      const updatedProduct = await ProductRepository.updateProduct(id, productRequest);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
    public async deleteProduct(id: string): Promise<IItem | null> {
      try {
        const deleteProduct = await productRepository.deleteProduct(id);
        return deleteProduct;
      } catch (error) {
        throw error;
      }
  }
  public async getAllProducts(page: number, limit: number): Promise<IItem[] | null> {
    try {
      const products = await productRepository.getAllProducts(page, limit);
      return products;
    } catch (error) {
      throw error;
    }
   }

}


export default new ProductService();