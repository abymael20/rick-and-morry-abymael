
export type episodesType = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  }

  
export type PageableEpisodesType = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: episodesType[] | [];
  };
  