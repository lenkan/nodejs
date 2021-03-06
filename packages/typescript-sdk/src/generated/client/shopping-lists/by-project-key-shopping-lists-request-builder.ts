import { ByProjectKeyShoppingListsByIDRequestBuilder } from './by-project-key-shopping-lists-by-id-request-builder'
import { ByProjectKeyShoppingListsKeyByKeyRequestBuilder } from './by-project-key-shopping-lists-key-by-key-request-builder'
import {
  ShoppingList,
  ShoppingListDraft,
  ShoppingListPagedQueryResponse,
} from './../../models/shopping-list'
import { ApiRequestExecutor, ApiRequest } from './../../base/requests-utils'

export class ByProjectKeyShoppingListsRequestBuilder {
  constructor(
    protected readonly args: {
      pathArgs: {
        projectKey: string
      }
      apiRequestExecutor: ApiRequestExecutor
    }
  ) {}
  public withKey(childPathArgs: {
    key: string
  }): ByProjectKeyShoppingListsKeyByKeyRequestBuilder {
    return new ByProjectKeyShoppingListsKeyByKeyRequestBuilder({
      pathArgs: {
        ...this.args.pathArgs,
        ...childPathArgs,
      },
      apiRequestExecutor: this.args.apiRequestExecutor,
    })
  }
  public withId(childPathArgs: {
    ID: string
  }): ByProjectKeyShoppingListsByIDRequestBuilder {
    return new ByProjectKeyShoppingListsByIDRequestBuilder({
      pathArgs: {
        ...this.args.pathArgs,
        ...childPathArgs,
      },
      apiRequestExecutor: this.args.apiRequestExecutor,
    })
  }

  /**
   *	Query shopping-lists
   */
  public get(methodArgs?: {
    queryArgs?: {
      expand?: string | string[]
      where?: string | string[]
      sort?: string | string[]
      limit?: number | number[]
      offset?: number | number[]
      withTotal?: boolean | boolean[]
    }
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<ShoppingListPagedQueryResponse> {
    return new ApiRequest<ShoppingListPagedQueryResponse>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'GET',
        uriTemplate: '/{projectKey}/shopping-lists',
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
   *	Create ShoppingList
   */
  public post(methodArgs: {
    queryArgs?: {
      expand?: string | string[]
    }
    body: ShoppingListDraft
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<ShoppingList> {
    return new ApiRequest<ShoppingList>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'POST',
        uriTemplate: '/{projectKey}/shopping-lists',
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
}
