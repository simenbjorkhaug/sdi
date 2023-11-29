import { assert } from 'https://deno.land/std@0.206.0/assert/mod.ts'
import { Container, Service } from '../mod.ts'
import 'npm:@bjorkhaug/sreflect@0.0.2'

Deno.test('Proove service injection capability', () => {
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

  const myServiceInstance = Container.get<ServiceB>(ServiceB)

  assert(myServiceInstance.a.shouldBeTwo() === 2)
})
