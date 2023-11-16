// deno-lint-ignore-file ban-types no-explicit-any
const ResolveDependencies = Symbol('resolve:dependencies')

export class Container {
  static [ResolveDependencies](target: Object) {
    const { dependencies }: any =
      Reflect.getMetadata('di:injectable', target) ?? {}

    if (dependencies) {
      return new (target as any)(...dependencies.map((dep: any) => {
        return Container[ResolveDependencies](dep)
      }))
    }

    return new (target as any)()
  }

  static get(target: Object) {
    return Container[ResolveDependencies](target)
  }
}

export function Service() {
  return function (target: Object) {
    console.log(Reflect.getMetadata('design:type', target))
    Reflect.defineMetadata('di:injectable', {
      dependencies: Reflect.getMetadata('design:paramtypes', target),
    }, target)
  }
}
