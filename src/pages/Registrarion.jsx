import { handleRegistration } from '../api/api'
import Form from '../components/Form'

export default function Registration() {
    const fields = [
        { label: 'E-Mail', type: 'email', id: 'email', pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$' },
        { label: 'Name', type: 'text', id: 'name' },
        { label: 'Passwort', type: 'password', id: 'password' },
      ];
  return <Form fields={fields} submitFunction={handleRegistration}/>
}

