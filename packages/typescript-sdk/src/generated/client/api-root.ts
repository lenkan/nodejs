import { ByProjectKeyRequestBuilder } from './by-project-key-request-builder'
import { Middleware } from '../base/common-types'
import { ApiRequestExecutor } from '../base/requests-utils'

export class ApiRoot {
  private apiRequestExecutor: ApiRequestExecutor
  constructor(args: { middlewares: Middleware[] }) {
    this.apiRequestExecutor = new ApiRequestExecutor(args.middlewares)
  }

  /**
   *	The Project endpoint is used to retrieve certain information from a project.
   */
  public withProjectKey(childPathArgs: {
    projectKey: string
  }): ByProjectKeyRequestBuilder {
    return new ByProjectKeyRequestBuilder({
      pathArgs: {
        ...childPathArgs,
      },
      apiRequestExecutor: this.apiRequestExecutor,
    })
  }
}
