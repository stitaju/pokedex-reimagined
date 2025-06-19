export const getPokemonIdFromUrl = (
  url: string
): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
};

export const getEvolutionChainIdFromUrl = (
  url: string
): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
};
