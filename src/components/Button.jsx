export default function Button({
  children: description = 'descricao do botao',
  onButtonClick = null,
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      className="bg-gray-200 p-2 rounded-md m m-1"
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
