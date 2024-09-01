interface Hero {
    id: number;
    name: string;
    available: boolean;
  }
  
  interface HeroItemProps {
    hero: Hero;
    onClick: () => void;
  }
  
  export default function HeroItem({ hero, onClick }: HeroItemProps) {
    return (
      <li
        className={`hero-item ${hero.available ? 'available' : 'unavailable'}`}
        onClick={onClick}
      >
        {hero.id}. {hero.name} {hero.available && '“Available”'}
      </li>
    );
  }