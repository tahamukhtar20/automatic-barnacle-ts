/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { getBrands } from '~/api/routes/endpoints/brands';
import { IBrand } from '~/interfaces/brand';
import { IFilterValues, IListOptions, IReviewsList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { IProductsList, IProduct } from '~/interfaces/product';
import { IReview } from '~/interfaces/review';
import { IShopCategory } from '~/interfaces/category';
import {
    IAddProductReviewData,
    ICheckoutData,
    IGetBrandsOptions,
    IGetCategoriesOptions,
    IGetCategoryBySlugOptions,
    IGetSearchSuggestionsOptions,
    IGetSearchSuggestionsResult,
    ShopApi,
} from '~/api/base';
import {
    addProductReview,
    checkout,
    getCategories,
    getCategoryBySlug,
    getEngineCategories,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductAnalogs,
    getProductBySlug,
    getProductReviews,
    getProductsList,
    getRelatedProducts,
    getSearchSuggestions,
    getSpecialOffers,
    getTopRatedProducts,
} from '~/api/routes/endpoints';

export class ShopApiIntg implements ShopApi {
    getEngineCategories(slug:string|null, limit:number): Promise<IShopCategory[]> {
        return getEngineCategories(slug, limit);
    }

    getCategoryBySlug(slug: string, options?: IGetCategoryBySlugOptions): Promise<IShopCategory> {
        return getCategoryBySlug(slug, options);
    }

    getCategories(options?: IGetCategoriesOptions): Promise<IShopCategory[]> {
        return getCategories(options);
    }

    getBrands(options?: IGetBrandsOptions): Promise<IBrand[]> {
        return getBrands(options);
    }

    getProductsList(options: IListOptions = {}, filters: IFilterValues = {}): Promise<IProductsList> {
        // @ts-ignore
        return getProductsList(options, filters);
    }

    getProductBySlug(slug: string): Promise<IProduct> {
        return getProductBySlug(slug);
    }

    getProductReviews(productId: number, options?: IListOptions): Promise<IReviewsList> {
        return getProductReviews(productId, options);
    }

    addProductReview(productId: number, data: IAddProductReviewData): Promise<IReview> {
        return addProductReview(productId, data);
    }

    getProductAnalogs(productId: number): Promise<IProduct[]> {
        return getProductAnalogs(productId);
    }

    getRelatedProducts(productId: number, limit: number): Promise<IProduct[]> {
        return getRelatedProducts(productId, limit);
    }

    getFeaturedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getFeaturedProducts(categorySlug, limit);
    }

    getPopularProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getPopularProducts(categorySlug, limit);
    }

    getTopRatedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getTopRatedProducts(categorySlug, limit);
    }

    getSpecialOffers(limit: number): Promise<IProduct[]> {
        return getSpecialOffers(limit);
    }

    getLatestProducts(limit: number): Promise<IProduct[]> {
        return getLatestProducts(limit);
    }

    getSearchSuggestions(
        query: string,
        options?: IGetSearchSuggestionsOptions,
    ): Promise<IGetSearchSuggestionsResult> {
        return getSearchSuggestions(query, options);
    }

    checkout(data: ICheckoutData): Promise<IOrder> {
        return checkout(data);
    }
}
