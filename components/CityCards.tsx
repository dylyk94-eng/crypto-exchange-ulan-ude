'use client';

import Link from 'next/link';

interface CityCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  btnText?: string;
}

interface CityCardsProps {
  cities: CityCard[];
}

export default function CityCards({ cities }: CityCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-3.5">
      {cities.map((city, index) => (
        <article
          key={city.id}
          className="relative overflow-hidden min-h-[194px] rounded-lg glass-panel card-hover group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-75 transition-opacity duration-500"
            style={{ backgroundImage: `url(${city.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(9,13,24,0.95)] via-[rgba(9,13,24,0.75)] to-[rgba(9,13,24,0.3)] group-hover:via-[rgba(9,13,24,0.65)] transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,11,20,0.8)] via-transparent to-transparent" />
          <div className="relative p-4.5 pt-auto h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 gradient-text">{city.title}</h3>
              <div className="text-[#79c887] font-semibold mb-4.5 max-w-[210px] leading-relaxed">
                {city.subtitle}
              </div>
            </div>
            <Link
              href={city.link}
              className="inline-block px-6 py-2.5 btn-gold text-[#2d2006] font-bold rounded-lg text-sm text-center"
            >
              {city.btnText || 'Перейти'}
            </Link>
          </div>
          {/* Decorative glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d49123] to-[#b07a25] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-lg" />
        </article>
      ))}
    </div>
  );
}
