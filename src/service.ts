// deno-lint-ignore-file ban-types no-explicit-any
const ResolveDependencies = Symbol('resolve:dependencies')

export class Container {
  static [ResolveDependencies]<T>(target: T): T {
    const { dependencies }: any =
      Reflect.getMetadata('di:injectable', target as Object) ?? {}

    if (dependencies) {
      return new (target as any)(...dependencies.map((dep: any) => {
        return Container[ResolveDependencies](dep)
      }))
    }

    return new (target as any)()
  }

  static get<T>(target: any): T {
    return Container[ResolveDependencies](target)
  }
}

export function Service() {
  return function (target: Object) {
    Reflect.defineMetadata('di:injectable', {
      dependencies: Reflect.getMetadata('design:paramtypes', target),
    }, target)
  }
}
