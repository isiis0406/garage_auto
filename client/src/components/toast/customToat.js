import { toast } from 'react-toastify'

export const customErrorToast = (theme, message) => {
  toast.error(message, {
    theme: theme
  })
}
export const customSuccesToast = (theme, message) => {
  toast.success(message, {
    theme: theme
  })
}
export const customInfoToast = (theme, message) => {
  toast.info(message, {
    theme: theme
  })
}

 