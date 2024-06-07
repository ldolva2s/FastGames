export type something = {
  test: string;
};

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  tribe?: string;
};

export type PlayerStats = {
  name: string;
  wins: number;
  losses: number;
};
