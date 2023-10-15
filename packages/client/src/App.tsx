import React, { FC, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { FormInput } from './components/formInput'
import './App.scss'

const App: FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <div>
        <h1>Вход</h1>
        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 500))
            alert(JSON.stringify(values, null, 2))
          }}>
          <Form>
            <br />
            <FormInput
              type="text"
              id="login"
              name="login"
              labelText="Логин"
              placeholder="Введите логин"
            />
            <br />
            <FormInput
              id="password"
              name="password"
              type="password"
              labelText="Пароль"
              placeholder="Введите пароль"
            />
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default App
