import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { XMarkIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ProductList } from '@/components/products/ProductList';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Pagination } from '@/components/ui/Pagination';
import { useProducts } from '@/features/products/hooks/useProducts';

const sortOptions = [
  { name: 'Mais recentes', value: 'newest' },
  { name: 'Menor preço', value: 'price-asc' },
  { name: 'Maior preço', value: 'price-desc' },
  { name: 'Melhor avaliados', value: 'rating' },
];

const filters = {
  categories: [
    { value: 'processadores', label: 'Processadores', count: 120 },
    { value: 'placas-de-video', label: 'Placas de Vídeo', count: 84 },
    { value: 'memorias', label: 'Memórias', count: 156 },
    { value: 'armazenamento', label: 'Armazenamento', count: 92 },
    { value: 'perifericos', label: 'Periféricos', count: 76 },
    { value: 'gabinetes', label: 'Gabinetes', count: 45 },
  ],
  brands: [
    { value: 'intel', label: 'Intel', count: 52 },
    { value: 'amd', label: 'AMD', count: 48 },
    { value: 'nvidia', label: 'NVIDIA', count: 36 },
    { value: 'corsair', label: 'Corsair', count: 28 },
    { value: 'samsung', label: 'Samsung', count: 24 },
  ],
  priceRanges: [
    { value: '0-500', label: 'Até R$ 500', count: 120 },
    { value: '500-1000', label: 'R$ 500 - R$ 1000', count: 156 },
    { value: '1000-2000', label: 'R$ 1000 - R$ 2000', count: 92 },
    { value: '2000-5000', label: 'R$ 2000 - R$ 5000', count: 76 },
    { value: '5000-', label: 'Acima de R$ 5000', count: 45 },
  ],
};

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Obter parâmetros da URL
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  
  // Filtrar produtos com base nos parâmetros
  const { data, isLoading, error } = useProducts({
    category,
    page,
    sort,
    search,
    // Outros filtros podem ser adicionados aqui
  });

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', value);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (filterType === 'category') {
      if (value) {
        newParams.set('category', value);
      } else {
        newParams.delete('category');
      }
    } else if (filterType === 'brand') {
      const brands = newParams.getAll('brand');
      if (brands.includes(value)) {
        newParams.delete('brand');
        brands.filter(b => b !== value).forEach(b => newParams.append('brand', b));
      } else {
        newParams.append('brand', value);
      }
    } else if (filterType === 'price') {
      if (value) {
        newParams.set('price', value);
      } else {
        newParams.delete('price');
      }
    }
    
    // Resetar para a primeira página ao alterar os filtros
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeFilters = [];
  if (category) {
    const categoryLabel = filters.categories.find(c => c.value === category)?.label || category;
    activeFilters.push({
      name: 'Categoria',
      value: categoryLabel,
      onRemove: () => handleFilterChange('category', ''),
    });
  }

  const selectedBrands = searchParams.getAll('brand');
  selectedBrands.forEach(brandValue => {
    const brandLabel = filters.brands.find(b => b.value === brandValue)?.label || brandValue;
    activeFilters.push({
      name: 'Marca',
      value: brandLabel,
      onRemove: () => {
        const newParams = new URLSearchParams(searchParams);
        const filteredBrands = selectedBrands.filter(b => b !== brandValue);
        newParams.delete('brand');
        filteredBrands.forEach(b => newParams.append('brand', b));
        newParams.set('page', '1');
        setSearchParams(newParams);
      },
    });
  });

  const priceRange = searchParams.get('price');
  if (priceRange) {
    const priceLabel = filters.priceRanges.find(p => p.value === priceRange)?.label || priceRange;
    activeFilters.push({
      name: 'Faixa de preço',
      value: priceLabel,
      onRemove: () => handleFilterChange('price', ''),
    });
  }

  return (
    <div className="bg-white">
      <div>
        {/* Filtros móveis */}
        <div className="lg:hidden">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FunnelIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
            Filtros
          </button>
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {category ? filters.categories.find(c => c.value === category)?.label : 'Todos os produtos'}
            </h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <label htmlFor="sort" className="sr-only">
                    Ordenar por
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filtros</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Visualização em grade</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Produtos
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filtros */}
              <div className="hidden lg:block">
                <ProductFilters
                  filters={filters}
                  selectedCategory={category}
                  selectedBrands={selectedBrands}
                  selectedPriceRange={priceRange || ''}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </div>

              {/* Lista de produtos */}
              <div className="lg:col-span-3">
                {/* Filtros ativos */}
                {activeFilters.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Filtros ativos:</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter, filterIdx) => (
                        <span
                          key={`${filter.name}-${filterIdx}`}
                          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                        >
                          <span className="mr-1.5">{filter.name}: {filter.value}</span>
                          <button
                            type="button"
                            className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-500"
                            onClick={filter.onRemove}
                          >
                            <span className="sr-only">Remover filtro</span>
                            <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </span>
                      ))}
                      {activeFilters.length > 0 && (
                        <button
                          type="button"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          onClick={clearFilters}
                        >
                          Limpar todos
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Lista de produtos */}
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Erro ao carregar produtos. Por favor, tente novamente.</p>
                  </div>
                ) : data && data.products.length > 0 ? (
                  <>
                    <ProductList products={data.products} />
                    {data.totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination
                          currentPage={page}
                          totalPages={data.totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={clearFilters}
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Modal de filtros móveis */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          mobileFiltersOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Filtros móveis */}
          <div className="mt-4 border-t border-gray-200">
            <ProductFilters
              filters={filters}
              selectedCategory={category}
              selectedBrands={selectedBrands}
              selectedPriceRange={priceRange || ''}
              onFilterChange={handleFilterChange}
              onClearFilters={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              isMobile
            />
          </div>
        </div>
      </div>
    </div>
  );
}
