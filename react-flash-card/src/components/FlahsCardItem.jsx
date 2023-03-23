import { BiEdit as EditIcon } from 'react-icons/bi';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';

export default function FlahsCardItem({
  children: flashcard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description } = flashcard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashcard.id);
    }
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(flashcard);
    }
  }

  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-4">
        <li>
          <strong>Título: </strong>
          <span>{title}</span>
        </li>

        <li>
          <strong>Descrição: </strong>
          <span>{description}</span>
        </li>
      </ul>

      <div className="mt-4 flex flex-row items-center justify-end space-x-4">
        <EditIcon
          size={24}
          className={'cursor-pointer'}
          onClick={handleEditIconClick}
        />
        <DeleteIcon
          size={24}
          className={'cursor-pointer'}
          onClick={handleDeleteIconClick}
        />
      </div>
    </div>
  );
}
