import styles from './Select.module.css';

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select 
        name={name} 
        id={name} 
        onChange={handleOnChange} 
        value={value}
      >
        <option>Selecione uma opção</option>
        {options &&
          options.map((option) => {
            // Optional: You can keep the console log here inside the block if you want
            // console.log(option); 
            return (
              <option value={option.id} key={option.id}>
                {option.Nome}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default Select;
