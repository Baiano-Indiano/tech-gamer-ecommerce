import React from 'react';

interface HighlightMatchProps {
  text: string;
  query: string;
  highlightStyle?: React.CSSProperties;
}

const defaultHighlightStyle: React.CSSProperties = {
  background: 'transparent',
  color: 'inherit',
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  textDecorationThickness: '2px',
  textDecorationColor: 'currentColor',
};

/**
 * Componente que destaca correspondências de texto em um conteúdo
 */
export const HighlightMatch: React.FC<HighlightMatchProps> = ({
  text,
  query,
  highlightStyle = defaultHighlightStyle,
}) => {
  if (!query.trim()) return <>{text}</>;
  
  try {
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => {
          const isMatch = regex.test(part);
          return isMatch ? (
            <span key={index} style={highlightStyle}>
              {part}
            </span>
          ) : (
            part
          );
        })}
      </>
    );
  } catch {
    // Fallback if regex fails
    return <>{text}</>;
  }
};
