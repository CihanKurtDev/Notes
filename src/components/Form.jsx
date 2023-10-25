import { useNavigate } from 'react-router-dom'

export default function Form({ fields, submitFunction, extra = []}) {
  const navigate = useNavigate()

  return (
    <form className="form light" onSubmit={(e) => submitFunction(e, navigate)}>
        {fields.map((field, index) => (
          <label key={index} className="form__label" htmlFor={field.id}>
            {field.label}
            <input className="input" type={field.type} id={field.id} pattern={field?.pattern} />
          </label>
        ))}
        {extra.map((tag, index) => {
            return <tag.type index={index} {...tag.props}>{tag.props.text}</tag.type>
        })}
        <button className="button--login" type='submit'>Senden</button>
      </form>
  );
}
