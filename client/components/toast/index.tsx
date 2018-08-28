import createToast, { ToastOptions, InstanceInterface } from './toast'

let toastInstance: any

const defaultOptions: ToastOptions = {
  message: '',
  duration: 2000,
}

/**
 * Get container instance, use singleton mode
 */
const getContainerInstance: () => Promise<InstanceInterface> = async () => {
  if (!toastInstance) {
    toastInstance = await createToast()
  }

  return toastInstance
}

/**
 * Show toast
 * @param payload - toast payload
 */
const show = async (payload: ToastOptions | string) => {
  const options = typeof payload === 'string'
    ? {
      ...defaultOptions,
      ...{ message: payload }
    } : {
      ...defaultOptions,
      ...payload,
    }

  const toast = await getContainerInstance()

  await toast.add(options)

  return
}

/**
 * Remove toast manually
 * @param key - specific toast key
 */
const remove = async (key: string) => {
  const toast = await getContainerInstance()

  await toast.remove(key)

  return
}

const api = {
  show,
  remove,
}

export interface ToastAPI {
  show(payload: ToastOptions | string): Promise<any>
  remove(key: string): Promise<any>
}

export default api as ToastAPI
