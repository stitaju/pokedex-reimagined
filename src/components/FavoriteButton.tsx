import React from 'react';
import { Heart } from 'lucide-react';
import { useAddToFavorites, useRemoveFromFavorites, useIsFavorite } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  pokemonId: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  pokemonId, 
  className = '',
  size = 'md'
}) => {
  const isFavorite = useIsFavorite(pokemonId);
  const addToFavoritesMutation = useAddToFavorites();
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isFavorite) {
        await removeFromFavoritesMutation.mutateAsync(pokemonId);
      } else {
        await addToFavoritesMutation.mutateAsync(pokemonId);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const isLoading = addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending;

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        isFavorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`${sizeClasses[size]} transition-all duration-200 ${
          isFavorite ? 'fill-current' : ''
        }`}
      />
    </button>
  );
};

export default FavoriteButton;