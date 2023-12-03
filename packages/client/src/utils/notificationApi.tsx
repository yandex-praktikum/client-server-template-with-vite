interface IData {
  title: string
  body: string
  src: string
}

const notificationApi = async (data: IData) => {
  const showNotification = () => {
    const { title, body, src } = data
    const notification = new Notification(title, {
      body: body,
      icon: src,
    })

    const timer = setTimeout(() => {
      notification.close()
    }, 10 * 1000)

    return () => {
      clearTimeout(timer)
    }
  }

  let granted = false

  try {
    if (Notification.permission === 'granted') {
      granted = true
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      granted = permission === 'granted' ? true : false
    }

    granted ? showNotification() : console.log('You blocked the notifications')
  } catch (err: any) {
    console.error(err.message)
  }
}

export default notificationApi
