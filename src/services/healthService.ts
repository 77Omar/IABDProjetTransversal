const mockData = {
  Dakar: { cases: 24, deaths: 2 },
  Thiès: { cases: 15, deaths: 1 },
  // ... autres régions
};

type Region = keyof typeof mockData;

export const fetchHeatRelatedCases = async (region: Region) => {
  // En attendant une vraie API, voici une simulation
  return mockData[region] || { cases: 0, deaths: 0 };
};
