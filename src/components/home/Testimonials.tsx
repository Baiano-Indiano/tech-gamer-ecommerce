import { StarIcon } from '@heroicons/react/20/solid';

const testimonials = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Desenvolvedor Full Stack',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content:
      'Comprei um novo PC gamer completo e a experiência foi incrível! O atendimento foi excelente e o produto chegou antes do prazo.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    role: 'Designer Gráfico',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    content:
      'Ótimo atendimento e produtos de qualidade. Com certeza voltarei a comprar aqui!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Carlos Santos',
    role: 'Streamer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    content:
      'A melhor loja de informática que já comprei. Produtos originais e preços justos. Recomendo!',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Confira a opinião de quem já comprou conosco
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg bg-gray-50 p-8 shadow-sm"
            >
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.avatar}
                  alt={`${testimonial.name} avatar`}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      testimonial.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
