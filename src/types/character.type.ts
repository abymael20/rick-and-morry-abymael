export type PageableCharacterType = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: /* colocar o character*/[] | [];
  };
  