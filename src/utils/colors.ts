export const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0', 
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

export const typeGradients: Record<string, string> = {
  normal: 'from-gray-400 to-gray-500',
  fire: 'from-red-400 to-orange-500',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-300 to-yellow-500',
  grass: 'from-green-400 to-green-600',
  ice: 'from-cyan-300 to-cyan-500',
  fighting: 'from-red-600 to-red-700',
  poison: 'from-purple-500 to-purple-600',
  ground: 'from-yellow-600 to-amber-600',
  flying: 'from-indigo-400 to-purple-400',
  psychic: 'from-pink-400 to-pink-600',
  bug: 'from-lime-500 to-green-500',
  rock: 'from-stone-500 to-stone-600',
  ghost: 'from-purple-600 to-indigo-700',
  dragon: 'from-indigo-600 to-purple-700',
  dark: 'from-gray-700 to-gray-800',
  steel: 'from-slate-400 to-slate-500',
  fairy: 'from-pink-300 to-rose-400'
};

export const getTypeColor = (type: string): string => {
  return typeColors[type] || typeColors.normal;
};

export const getTypeGradient = (type: string): string => {
  return typeGradients[type] || typeGradients.normal;
};