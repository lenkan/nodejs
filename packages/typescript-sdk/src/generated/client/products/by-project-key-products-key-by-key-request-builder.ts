import { Product, ProductUpdate } from './../../models/product'
import { ApiRequestExecutor, ApiRequest } from './../../base/requests-utils'

export class ByProjectKeyProductsKeyByKeyRequestBuilder {
  constructor(
    protected readonly args: {
      pathArgs: {
        projectKey: string
        key: string
      }
      apiRequestExecutor: ApiRequestExecutor
    }
  ) {}
  /**
   *	Gets the full representation of a product by Key.
   */
  public get(methodArgs?: {
    queryArgs?: {
      priceCurrency?: string | string[]
      priceCountry?: string | string[]
      priceCustomerGroup?: string | string[]
      priceChannel?: string | string[]
      expand?: string | string[]
    }
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Product> {
    return new ApiRequest<Product>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'GET',
        uriTemplate: '/{projectKey}/products/key={key}',
        pathVariables: this.args.pathArgs,
        headers: {
          ...methodArgs?.headers,
        },
        queryParams: methodArgs?.queryArgs,
      },
      this.args.apiRequestExecutor
    )
  }
  /**
   *	Update Product by key
   */
  public post(methodArgs: {
    queryArgs?: {
      priceCurrency?: string | string[]
      priceCountry?: string | string[]
      priceCustomerGroup?: string | string[]
      priceChannel?: string | string[]
      expand?: string | string[]
    }
    body: ProductUpdate
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Product> {
    return new ApiRequest<Product>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'POST',
        uriTemplate: '/{projectKey}/products/key={key}',
        pathVariables: this.args.pathArgs,
        headers: {
          'Content-Type': 'application/json',
          ...methodArgs?.headers,
        },
        queryParams: methodArgs?.queryArgs,
        body: methodArgs?.body,
      },
      this.args.apiRequestExecutor
    )
  }
  /**
   *	Delete Product by key
   */
  public delete(methodArgs: {
    queryArgs: {
      priceCurrency?: string | string[]
      priceCountry?: string | string[]
      priceCustomerGroup?: string | string[]
      priceChannel?: string | string[]
      version: number | number[]
      expand?: string | string[]
    }
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Product> {
    return new ApiRequest<Product>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'DELETE',
        uriTemplate: '/{projectKey}/products/key={key}',
        pathVariables: this.args.pathArgs,
        headers: {
          ...methodArgs?.headers,
        },
        queryParams: methodArgs?.queryArgs,
      },
      this.args.apiRequestExecutor
    )
  }
}
