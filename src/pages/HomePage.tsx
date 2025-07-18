import { Link } from 'react-router-dom';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Testimonials } from '@/components/home/Testimonials';

export function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />
      
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Destaques</h2>
          <Link 
            to="/products" 
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Ver todos
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      <PromoBanner 
        title="Frete Grátis"
        subtitle="Em compras acima de R$ 500,00"
        ctaText="Comprar Agora"
        ctaLink="/products"
        bgColor="bg-gradient-to-r from-primary-500 to-primary-700"
      />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categorias</h2>
        <Categories />
      </section>

      <Testimonials />

      <PromoBanner 
        title="Novidades toda semana"
        subtitle="Cadastre-se e receba ofertas exclusivas"
        ctaText="Criar Conta"
        ctaLink="/auth/register"
        bgColor="bg-gradient-to-r from-gray-900 to-gray-700"
      />
    </div>
  );
}
