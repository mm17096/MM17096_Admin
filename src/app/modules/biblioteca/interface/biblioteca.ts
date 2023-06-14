export interface IBiblioteca {
  id: number;
  nombre: string;
  libros?: Ilibros[];
}

export interface Ilibros{
  id: number;
  nombre: string;
}

