import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );

    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.fetchProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productService.getSingleProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(
      productId,
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') productId: string) {
    this.productService.deleteProduct(productId);
    return null;
  }
}
