import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
          className="w-full h-full object-cover object-center opacity-30"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

      <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          As melhores ofertas em tecnologia
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          Encontre os melhores produtos de informática com os melhores preços do mercado.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-block bg-primary-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-primary-700 md:py-4 md:px-10 md:text-lg"
        >
          Ver ofertas
        </Link>
      </div>
    </div>
  );
}
