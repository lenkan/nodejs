# SDK

This section contains all information about the sdk-related packages.

> If you are looking to migrate from the `sphere-node-sdk` package, please read the [migration guide](/docs/sdk/upgrading-from-sphere-node-sdk.md).


## Design architecture

The SDK is now split into multiple little packages, think about it as a *microservice* architecture. This is by choice and it provides several different advantages:
- flexibility: choose the packages that fits best your use case
- extensibility: developers can potentially build their own packages to extend / replace pieces of the SDK packages (e.g. custom [middlewares](/docs/sdk/Middlewares.md))
- maintainability: easier to maintain each single little package instead of one big library. This is also one of the reasons to use a [monorepo](https://github.com/lerna/lerna)

The core of the SDK lies within its [middlewares](/docs/sdk/Middlewares.md) implementation.
Middlewares do specific things and can be replaced by other middlewares depending on the use case, allowing many possible combinations.

The SDK *client* itself is in fact really simple and somehow even agnostic of the specific commercetools platform API that can be used as a generic HTTP client.

If we take a step back and look at the general requirement, at the end we simply want to **execute a request**. It just happens to be that we want to make specific requests to the commercetools platform API but it might be as well any other API. That's where the [middlewares](/docs/sdk/Middlewares.md) come in, which provide the *side effects* of the given request.


## Usage example

```js
import { createRequestBuilder } from '@commercetools/api-request-builder'
import { createClient } from '@commercetools/sdk-client'
import {
  createAuthMiddlewareForClientCredentialsFlow,
} from '@commercetools/sdk-middleware-auth'
import {
  createHttpMiddleware,
} from '@commercetools/sdk-middleware-http'
import {
  createQueueMiddleware,
} from '@commercetools/sdk-middleware-queue'
import omit from 'lodash.omit'

const ignoredResponseKeys = [ 'id', 'createdAt', 'lastModifiedAt' ]

const service = createRequestBuilder().channels

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey 'test',
  credentials: {
    clientId: '123',
    clientSecret: 'secret',
  },
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.sphere.io',
})
const queueMiddleware = createQueueMiddleware({
  concurrency: 5,
})
const client = createClient({
  middlewares: [
    authMiddleware,
    httpMiddleware,
    queueMiddleware,
  ],
})

describe('Channels', () => {
  const key = uniqueId('channel_')
  let channelResponse

  it('create', () => {
    const body = {
      key,
      name: { en: key },
    }
    const createRequest = {
      uri: service.build({ projectKey }),
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return client.execute(createRequest)
    .then((response) => {
      channelResponse = response.body
      expect(omit(response.body, ignoredResponseKeys)).toEqual({
        ...body,
        roles: ['InventorySupply'],
        version: 1,
      })
      expect(response.statusCode).toBe(201)
    })
  })

  it('fetch', () => {
    const fetchRequest = {
      uri: service.where(`key = "${key}"`).build({ projectKey }),
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return client.execute(fetchRequest)
    .then((response) => {
      expect(response.body.results).toHaveLength(1)
      expect(response.statusCode).toBe(200)
    })
  })

  it('update', () => {
    const updateRequest = {
      uri: service.byId(channelResponse.id).build({ projectKey }),
      method: 'POST',
      body: {
        version: channelResponse.version,
        actions: [
          { action: 'addRoles', roles: ['OrderImport'] },
        ],
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return client.execute(updateRequest)
    .then((response) => {
      channelResponse = response.body
      expect(omit(response.body, ignoredResponseKeys)).toEqual({
        key,
        name: { en: key },
        roles: ['InventorySupply', 'OrderImport'],
        version: 2,
      })
      expect(response.statusCode).toBe(200)
    })
  })

  it('delete', () => {
    const uri = service.byId(channelResponse.id).build({ projectKey })
    const deleteRequest = {
      uri: `${uri}?version=${channelResponse.version}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return client.execute(deleteRequest)
    .then((response) => {
      expect(response.statusCode).toBe(200)
    })
  })
})

let uniqueIdCounter = 0
function uniqueId (prefix) {
  const id = `${Date.now()}_${uniqueIdCounter}`
  uniqueIdCounter += 1
  return prefix ? prefix + id : id
}
```