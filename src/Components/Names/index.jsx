export function randomName() {
    const adjectives = ["Epiphytic", "Towering", "Luxuriant", "Dense", "Vibrant", "Elusive", "Endangered", "Nocturnal", "Majestic", "Exotic", "Colorful", "Enchanting", "Dense", "Mystical", "Fascinating", "Graceful", "Enveloping", "Shade-giving", "Oxygenating", "Flourishing", "Evergreen", "Canopy-dwelling", "Ornate", "Intriguing", "Wild", "Serpentine", "Wild", "Damp", "Long", "Late", "Lingering", "Old", "Young", "Mother", "Humid-loving", "Camouflaged", "Nutrient-rich", "Hardy", "Striking", "Nourishing", "Cascading", "Unfurling", "Shy", "Wandering","Fragrant", "Aged", "Proud", "Restless", "Divine"];
    const nouns = ["Orchidaceae ", "Bromeliaceae ", "Philodendron", "Heliconia", "Alocasia", "Anthurium", "Fern", "Monstera", "Bamboo", "Passionflower", "Rafflesia", "Mangrove", "Banana", "Mahogany ", "Pitcher", "Fittonia ", "Pilea ", "Calathea", "Maranta ", "Tillandsia ", "Ficus ", "Hoya", "Selaginella", "Syngonium", "Anthurium ", "Begonia", "Cryptanthus", "Episcia", "Neoregelia", "Tradescantia ", "Gloxinia", "Moss", "Sarracenia", "Aldrovanda", "Nepenthes", "Flytrap", "Drosophyllum", "Duckweed", "Salvinia", "Phyllanthus", "Pistia", "Eichhornia", "Liana", "Rattan", "Pothos", "Ivy", "Bignonia", "Kiwifruit", "Bougainvillea", "Passionflower "];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }
  
  export function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16); 
  }
  