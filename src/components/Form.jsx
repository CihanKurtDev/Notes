import { useNavigate, useLocation } from 'react-router-dom'
import userStore from '../stores/userStore';

export default function Form({ className = "form light", fields, submitFunction, extra = [] }) {
  const navigate = useNavigate()
  const location = useLocation().pathname.slice(1)
  const {setShowFolderForm} = userStore()

  return (
    <div className='form-wrapper'>
      <form className={className} onSubmit={(e) => submitFunction(e, navigate)}>
        {location === "Home" &&
        <div className='button__wrapper--flex-end'>
          <button className="button button--close" onClick={() => setShowFolderForm(false)}>x</button>
        </div>
        }
        <div className="formInfoWrapper">
          {fields.map((field, index) => (
            <label key={index} className="form__label" htmlFor={field.id}>
              {field.label}
              <input autoFocus className="input" type={field.type} id={field.id} pattern={field?.pattern} onChange={field.onChange} />
            </label>
          ))}
          {extra.map((tag, index) => {
              return <tag.type index={index} onClick={tag.props?.onClick} {...tag.props}>{tag.props.text}</tag.type>
          })}
        </div>
          <button className="button button--form" type='submit'>Senden</button>
      </form>
    </div>
  );
}
