import { useNavigate } from 'react-router-dom'

export default function Form({ className = "form light", fields, submitFunction, extra = [], onBlur }) {
  const navigate = useNavigate()
  return (
    <form className={className} onSubmit={(e) => submitFunction(e, navigate)} onBlur={onBlur}>
      <div className="formInfoWrapper">
        {fields.map((field, index) => (
          <label key={index} className="form__label" htmlFor={field.id}>
            {field.label}
            <input autoFocus className="input" type={field.type} id={field.id} pattern={field?.pattern} onChange={field.onChange} />
          </label>
        ))}
        {extra.map((tag, index) => {
            return <tag.type index={index} {...tag.props}>{tag.props.text}</tag.type>
        })}
      </div>
        <button className="button button--form" type='submit'>Senden</button>
      </form>
  );
}
