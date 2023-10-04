import { handleSubmit } from '../api/api';
import Form from '../components/Form';

export default function Login() {
  const fields = [
    { label: 'Name', type: 'text', id: 'name' },
    { label: 'Passwort', type: 'password', id: 'password' },
  ];
  
  return <Form fields={fields} submitFunction={handleSubmit}/>
}
