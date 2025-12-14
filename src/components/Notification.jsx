import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const {notification} = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification || !notification.visible) {
    console.log('Not visible, returning null')
    return null
  }
  
  console.log('Rendering notification with message:', notification.message)
  
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
