import * as React from 'react'
import * as Immutable from 'immutable'

declare global {
  module react {
    interface SVGAttributes<T> {
      ['xlink:href']?: string
    }
  }
}

declare interface ImmutableMap<T> extends Immutable.Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
}
