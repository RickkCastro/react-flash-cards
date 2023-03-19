import { useEffect, useState } from 'react';

export default function FlashCard({
  title = 'Título do card',
  description = 'Descricao, maior maior maior maior maior maior maior maior',
  showFlashCardTitle = true,
}) {
  const [showTitle, setShowTitle] = useState(showFlashCardTitle);

  const fontSizeClassName = showTitle ? 'text-xl' : 'text-sm';

  useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  function handleCardClick() {
    setShowTitle(currentShowTitle => !currentShowTitle);
  }

  return (
    <div
      className={`shadow-lg p-2 m-2 w-80 h h-48 cursor-pointer
                flex flex-row items-center justify-center 
                font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
