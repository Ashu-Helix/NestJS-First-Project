import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = (Math.random() * 10).toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products]; //returning copy of product array so that original will not get edited form outside beacause object and array are referenced type
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };

    console.log('Title Updated', prodId, title, desc, price);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return { ...updatedProduct };
  }

  removeProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    const removedProduct = this.products.splice(index, 1);
    return { ...removedProduct[0] };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((item) => {
      return item.id === id;
    });
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not found product.');
    }
    return [product, productIndex];
  }
}
