export interface Product {
    name: string;
    sku: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDto {
    id: number; 
    name: string;
}

export interface ProductInfoDto {
    id: number;
    name: string;
    sku: string;
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
    productPrice: number;

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