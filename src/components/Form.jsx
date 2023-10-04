import { useNavigate } from 'react-router-dom'

export default function Form({ fields, submitFunction}) {
  const navigate = useNavigate()
  
  return (
    <main className="form-wrapper">
      <form className="form light" onSubmit={(e) => submitFunction(e, navigate)}>
        {fields.map((field, index) => (
          <label key={index} className="form__label" htmlFor={field.id}>
            {field.label}
            <input className="input" type={field.type} id={field.id} pattern={field?.pattern} />
          </label>
        ))}
        <button className="button--login" type='submit'>{submitFunction.name}</button>
      </form>
    </main>
  );
}
