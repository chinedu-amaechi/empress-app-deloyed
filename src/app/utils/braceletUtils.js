export const getComponentIcon = (type) => {
    switch(type) {
      case 'pearl': return '⚪';
      case 'chain': return '⛓️';
      case 'heart': return '❤️';
      case 'flower': return '🌸';
      case 'oval': return '🔘';
      case 'square': return '◼️';
      case 'circle': return '🔵';
      default: return '・';
    }
  };