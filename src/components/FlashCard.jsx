export default function FlashCard({
  title = 'Título do card',
  description = 'Descricao, maior maior maior maior maior maior maior maior',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
  id,
}) {
  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';

  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  return (
    <div
      className={`shadow-lg p-2 m-2 w-80 h h-48 cursor-pointer
                flex flex-row items-center justify-center 
                font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
