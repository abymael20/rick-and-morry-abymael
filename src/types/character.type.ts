
export type PageableLocalType = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: LocalType[] | [];
  };
  
  export type LocalType = {
    id: number;
    name: string;
    type: string;
    dimension: string;
  };
