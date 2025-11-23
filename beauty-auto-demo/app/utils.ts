export const getCharacterImage = (id?: string) => {
    // Static image mapping for cost reduction
    const CHARACTER_IMAGES: Record<string, string> = {
        'sensitive': '/images/characters/glass_heart.png',
        'oily': '/images/characters/tsuya_dragon.png',
        'dry': '/images/characters/desert_princess.png',
        'mixed': '/images/characters/genius_puzzle.png',
    };

    return CHARACTER_IMAGES[id || 'sensitive'] || '/images/characters/glass_heart.png';
};
