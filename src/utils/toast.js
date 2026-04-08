import { toast } from 'react-toastify'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

const ToastIcon = ({ Icon, color }) => (
  <Icon size={20} color={color} />
)

export const showSuccess = (message) => {
  toast.success(message, {
    icon: <ToastIcon Icon={CheckCircle} color="#10b981" />
  })
}

export const showError = (message) => {
  toast.error(message, {
    icon: <ToastIcon Icon={XCircle} color="#ef4444" />
  })
}

export const showWarning = (message) => {
  toast.warning(message, {
    icon: <ToastIcon Icon={AlertCircle} color="#f59e0b" />
  })
}

export const showInfo = (message) => {
  toast.info(message, {
    icon: <ToastIcon Icon={Info} color="#3b82f6" />
  })
}
