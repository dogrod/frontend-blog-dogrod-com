import * as React from 'react'

declare global {
  module react {
    interface SVGAttributes<T> {
      ['xlink:href']?: string
    }
  }
}