import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Processadores',
    href: '/products?category=processadores',
    imageSrc: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Placas de Vídeo',
    href: '/products?category=placas-de-video',
    imageSrc: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Memórias',
    href: '/products?category=memorias',
    imageSrc: 'https://images.unsplash.com/photo-1592155931584-6acb16d44281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Armazenamento',
    href: '/products?category=armazenamento',
    imageSrc: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Periféricos',
    href: '/products?category=perifericos',
    imageSrc: 'https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Monitores',
    href: '/products?category=monitores',
    imageSrc: 'https://images.unsplash.com/photo-1546538915-a9e2c8d1a40e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
];

export function Categories() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.href}
          className="group relative h-64 overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            src={category.imageSrc}
            alt={category.name}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
            <p className="mt-1 text-sm text-gray-200">Ver produtos</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
