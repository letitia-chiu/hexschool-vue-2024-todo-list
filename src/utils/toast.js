import Swal from 'sweetalert2'

const SwalToast = Swal.mixin({
  toast: true,
  position: 'top',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})

/**
 * Colored Toast
 * @param {'success' | 'error' | 'info' | 'warning' | 'question'} type 
 * @param {string} title 
 * @returns 
 */
const Toast = (type, title) => {
  return SwalToast.fire({
    icon: type,
    title
  })
}

export default Toast