import { getNewId } from '../services/idService';

export default function TextArea({
  textAreaDesc = 'Descrição do text area: ',
  textAreaValue = 'Valor padrão do text area',
  onTextAreaChange = null,
  id = getNewId(),
  maxLEngth: maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label htmlFor={id} className="text-sm mb-1">
        {textAreaDesc}
      </label>
      <textarea
        maxLength={maxLength}
        rows={rows}
        className="border p-1 text-sm"
        id={id}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />

      <div className="text-right mr-1">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
