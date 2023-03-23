export default function Button({
  children: description = 'descricao do botao',
  onButtonClick = null,
  colorClass = 'bg-gray-200',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      className={`${colorClass} p-2 rounded-md m m-1`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
