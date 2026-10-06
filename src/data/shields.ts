import sublimadoImage from '../escudos/SUBLIMADO.jpeg';
import bordadoImage from '../escudos/BORDADO.jpeg';
import tpu3dImage from '../escudos/TPU 3D.jpeg';

export type ShieldId = 'sublimado' | 'bordado' | 'tpu-3d';

export type ShieldOption = {
  id: ShieldId;
  name: string;
  price: number;
  image: string;
};

export const shieldOptions: ShieldOption[] = [
  { id: 'sublimado', name: 'Sublimado', price: 0, image: sublimadoImage.src },
  { id: 'bordado', name: 'Bordado', price: 10, image: bordadoImage.src },
  { id: 'tpu-3d', name: 'TPU 3D', price: 15, image: tpu3dImage.src }
];

export const shieldById = (id: string) => shieldOptions.find((option) => option.id === id);

