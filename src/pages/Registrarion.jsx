import { handleRegistration } from '../api/api'
import Form from '../components/Form'

export default function Registration() {
    const fields = [
        { label: 'E-Mail', type: 'email', id: 'email', pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' },
        { label: 'Name', type: 'text', id: 'name' },
        { label: 'Passwort', type: 'password', id: 'password' },
      ];
  return <Form fields={fields} submitFunction={handleRegistration}/>
}

