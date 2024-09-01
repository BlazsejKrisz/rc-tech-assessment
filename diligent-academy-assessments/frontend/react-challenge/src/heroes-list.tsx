import { useState, useEffect } from "react";
import { callApi } from "./call-api";
import "./heroes.css";
import HeroItem from "./hero-item";

interface Hero {
  id: number;
  name: string;
  available: boolean;
}

const HeroesList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await callApi<Hero[]>("heroes");
        setHeroes(data);
      } catch (err) {
        console.error("Error fetching heroes:", err);
        setError("Failed to fetch heroes");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  const toggleAvailability = (id: number) => {
    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) =>
        hero.id === id ? { ...hero, available: !hero.available } : hero
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hero-list-container">
      <ul className="hero-list">
        {heroes.map((hero) => (
          <HeroItem
            key={hero.id}
            hero={hero}
            onClick={() => toggleAvailability(hero.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default HeroesList;
