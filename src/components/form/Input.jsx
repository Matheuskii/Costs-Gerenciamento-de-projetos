import styles from "./Input.module.css";

function Input({ type, text, nome, placeholder, handleOnChange, value, isCurrency, pattern }) {
  
  const handleCurrencyChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      val = (parseInt(val) / 100).toFixed(2);
    }
    e.target.value = val;
    handleOnChange(e);
  }

  const handleTextChange = (e) => {
    // Remove números e caracteres especiais, mantém apenas letras, espaços e alguns caracteres
    if (type === 'text' && !isCurrency) {
      let val = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      // Remove espaços múltiplos
      val = val.replace(/\s+/g, ' ').trim();
      e.target.value = val;
    }
    handleOnChange(e);
  }

  return (
    <div className={styles.form_control}>
      <label htmlFor={nome}>{text}:</label>
      <input
        type={isCurrency ? "text" : type}
        name={nome}
        id={nome}
        placeholder={placeholder}
        onChange={isCurrency ? handleCurrencyChange : (type === 'text' ? handleTextChange : handleOnChange)}
        value={isCurrency ? value : value}
        maxLength={nome === 'project_name' ? '100' : ''}
        pattern={pattern}
      />
    </div>
  );
}

export default Input;
