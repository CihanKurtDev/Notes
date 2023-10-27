import { handleRegistration } from '../api/api'
import Form from '../components/Form'
import Success from '../components/Success';
import userStore from '../stores/userStore';
import { useNavigate } from 'react-router-dom'

export default function Registration() {
  const {success, setSuccess} = userStore()
  const navigate = useNavigate()
    const fields = [
        { label: 'E-Mail', type: 'email', id: 'email', pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' },
        { label: 'Name', type: 'text', id: 'name' },
        { label: 'Passwort', type: 'password', id: 'password' },
      ];
  return (
    <div>
      <Success />
      {success === false &&<Form fields={fields} submitFunction={(e) => handleRegistration(e, navigate, setSuccess)}/>}
    </div>
    )
}

