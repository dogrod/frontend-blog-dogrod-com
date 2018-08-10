import Loadable from 'react-loadable'
import Loading from '@/components/loading'

type LoaderType = any

const LoadableComponent = (loader: LoaderType) => Loadable({
  loader,
  loading: Loading,
})

export default LoadableComponent
