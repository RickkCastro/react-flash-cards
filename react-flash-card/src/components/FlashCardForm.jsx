import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      clearField();
    }
  }, [createMode]);

  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError('');

      if (onPersist) {
        onPersist(title, description);
        clearField();
      }
    } else {
      setError('Título e Descrição são obrigatorio');
    }
  }

  function clearField() {
    setTitle('');
    setDescription('');
  }

  function handleFormReset() {
    clearField();
  }

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Manutenção de FlashCards</h2>

      <TextInput
        labelDescription="Título: "
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        textAreaDesc="Descrição: "
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />

      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span></span>}

        <div>
          <Button colorClass="bg-red-200" type="reset">
            Limpar
          </Button>
          <Button colorClass="bg-green-300" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
