// src/controllers/ItemController.ts
import { Controller, Route, Body, Post, Path, Get, Put, Response, Delete, Query } from 'tsoa';
import { ProductCreateRequest, ProductUpdateRequest } from '@/src/controllers/types/user-request.type';
import { IItem } from '@/src/database/models/product.model';
import ProductService from '@/src/services/product.service';

@Route('v1/products')
export class ProductController extends Controller {
  @Post()
  public async createItem(@Body() requestBody: ProductCreateRequest): Promise<IItem> {
    try {
      const newProduct = await ProductService.createProduct(requestBody);

      return {
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('{id}')
  public async getItemById(@Path() id: string): Promise<IItem | null> {
    try {
      const product = await ProductService.getProductById(id);

      return product;
    } catch (error) {
      throw error;
    }
  }

  // @Get()
  // public async getItemAll(): Promise<IItem[] | null> {
  //   try {
  //     const product = await ProductService.getProductAll();

  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get('/')
  public async getAllProducts(
    @Query() page: number = 1, // Default page number is 1
    @Query() limit: number = 2 // Default limit is 10
  ): Promise<IItem[] | null> {
    try {
      const products = await ProductService.getAllProducts(page, limit)

      return products;
    } catch (error) {
      throw error;
    }
  }


  @Put('{id}')
  @Response(404, 'Product not found')
  public async updateItem(@Path() id: string, @Body() requestBody: ProductUpdateRequest): Promise<IItem | null> {
    try {
      const updatedProduct = await ProductService.updateProduct(id, requestBody);

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  @Delete('{id}')
  @Response(204, 'Delete Success')
  public async deleteItemById(@Path() id: string): Promise<void> {
    try {
      await ProductService.deleteProduct(id);

    } catch (error) {
      throw error;
    }
  }
}
