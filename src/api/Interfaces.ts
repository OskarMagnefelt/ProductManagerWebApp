export interface Product {
    name: string;
    sku: string;
    description: string;
    price: number;
    image: string;
  }

export interface CategoryName {
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface GetProductInCategoryDto {
    productId: number;
    productName: string;
}
  
export interface GetProductCategoriesDto {
    categoryId: number;
    categoryName: string;
    products: GetProductInCategoryDto[];
}

export interface AddProductToCategoryDTO {
    categoryId: number;
    productId: number;
}