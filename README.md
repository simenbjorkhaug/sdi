# Simple Service Dependency Injection for Deno and Node.js

This module provides a simple service dependency injection system for Deno and
Node.js applications.

```typescript
import { Container, Service } from '@bjorkhaug/sdi'

@Service()
class ServiceA {
  // Your service code here
}

@Service()
class ServiceB {
  constructor(private readonly a: ServiceA) {}
  // Your service code here
}

const myServiceInstance = Container.get(ServiceB)
```

Note that the typescript compiler must emit metadata for this to work as we rely
on typescript metadata features.
