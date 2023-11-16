import { assert } from 'https://deno.land/std@0.206.0/assert/mod.ts'
import { Container, Service } from '../mod.ts'

Deno.test('Proove service injection capability', () => {
  @Service()
  class _ServiceA {
    // Your service code here
    shouldBeTwo() {
      return 2
    }
  }

  @Service()
  class ServiceB {
    constructor(readonly a: _ServiceA) {}
    // Your service code here
  }

  const myServiceInstance = Container.get(ServiceB)

  assert(myServiceInstance.a.shouldBeTwo() === 2)
})