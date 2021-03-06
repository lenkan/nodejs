import { CustomerSignInResult, CustomerSignin } from './../../models/customer'
import { ApiRequestExecutor, ApiRequest } from './../../base/requests-utils'

export class ByProjectKeyLoginRequestBuilder {
  constructor(
    protected readonly args: {
      pathArgs: {
        projectKey: string
      }
      apiRequestExecutor: ApiRequestExecutor
    }
  ) {}
  /**
   *	Authenticate Customer (Sign In). Retrieves the authenticated
   *	customer (a customer that matches the given email/password pair).
   *	If used with an access token for Anonymous Sessions,
   *	all orders and carts belonging to the anonymousId will be assigned to the newly created customer.
   *	If a cart is is returned as part of the CustomerSignInResult,
   *	it has been recalculated (It will have up-to-date prices, taxes and discounts,
   *	and invalid line items have been removed.).
   *
   */
  public post(methodArgs: {
    body: CustomerSignin
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<CustomerSignInResult> {
    return new ApiRequest<CustomerSignInResult>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'POST',
        uriTemplate: '/{projectKey}/login',
        pathVariables: this.args.pathArgs,
        headers: {
          'Content-Type': 'application/json',
          ...methodArgs?.headers,
        },
        body: methodArgs?.body,
      },
      this.args.apiRequestExecutor
    )
  }
}
