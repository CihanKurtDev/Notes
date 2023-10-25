import { handleSubmit } from '../api/api';
import Form from '../components/Form';

export default function Login() {
  const fields = [
    { label: 'Name', type: 'text', id: 'name' },
    { label: 'Passwort', type: 'password', id: 'password' },
  ];
  const extra = [
    { type: 'a', props: {
      href: 'http://localhost:5173/Registration', 
      text: 'Noch keinen Account? Jetzt Regisitrieren', 
      className: "form__anchor"
    }
  }]
  
  return  (
    <main className="form-wrapper">
      <Form 
      extra={extra} 
      fields={fields} 
      submitFunction={handleSubmit}
      />
    </main>
  ) 

}
