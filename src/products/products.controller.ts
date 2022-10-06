import {
  Controller,
  Post,
  Body,
  Get,
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
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updatedProduct = this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { message: `${updatedProduct.id}  product updated` };
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    const deletedProduct = this.productService.removeProduct(prodId);
    return { message: `${deletedProduct.id} product deleted ` };
  }
}
