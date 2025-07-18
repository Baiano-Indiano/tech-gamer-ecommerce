import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface Filters {
  categories: FilterOption[];
  brands: FilterOption[];
  priceRanges: FilterOption[];
}

interface ProductFiltersProps {
  filters: Filters;
  selectedCategory: string;
  selectedBrands: string[];
  selectedPriceRange: string;
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
}

export function ProductFilters({
  filters,
  selectedCategory,
  selectedBrands,
  selectedPriceRange,
  onFilterChange,
  onClearFilters,
  isMobile = false,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    brands: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters =
    selectedCategory || selectedBrands.length > 0 || selectedPriceRange;

  const handleBrandChange = (brandValue: string) => {
    onFilterChange('brand', brandValue);
  };

  const handlePriceRangeChange = (priceRange: string) => {
    // Se o mesmo range for clicado novamente, remove o filtro
    const newRange = selectedPriceRange === priceRange ? '' : priceRange;
    onFilterChange('price', newRange);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filtros</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* Categorias */}
      <div className="border-b border-gray-200 pb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="font-medium text-gray-900">Categorias</h4>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-500 transition-transform ${
              openSections.categories ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </div>
        {openSections.categories && (
          <div className="mt-4 space-y-2">
            <div className="space-y-1">
              <div
                className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                  !selectedCategory
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onFilterChange('category', '')}
              >
                <div className="flex items-center h-5">
                  <input
                    id="category-all"
                    name="category"
                    type="radio"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={!selectedCategory}
                    onChange={() => {}}
                  />
                </div>
                <label
                  htmlFor="category-all"
                  className="ml-3 text-sm text-gray-600 cursor-pointer"
                >
                  Todas as categorias
                </label>
              </div>
              {filters.categories.map((category) => (
                <div
                  key={category.value}
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                    selectedCategory === category.value
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onFilterChange('category', category.value)}
                >
                  <div className="flex items-center h-5">
                    <input
                      id={`category-${category.value}`}
                      name="category"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={selectedCategory === category.value}
                      onChange={() => {}}
                    />
                  </div>
                  <label
                    htmlFor={`category-${category.value}`}
                    className="ml-3 text-sm text-gray-600 cursor-pointer flex justify-between w-full"
                  >
                    <span>{category.label}</span>
                    {category.count !== undefined && (
                      <span className="text-gray-500 ml-2">
                        {category.count}
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Marcas */}
      <div className="border-b border-gray-200 pb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('brands')}
        >
          <h4 className="font-medium text-gray-900">Marcas</h4>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-500 transition-transform ${
              openSections.brands ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </div>
        {openSections.brands && (
          <div className="mt-4 space-y-2">
            {filters.brands.map((brand) => (
              <div
                key={brand.value}
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center h-5">
                  <input
                    id={`brand-${brand.value}`}
                    name={`brand-${brand.value}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedBrands.includes(brand.value)}
                    onChange={() => handleBrandChange(brand.value)}
                  />
                </div>
                <label
                  htmlFor={`brand-${brand.value}`}
                  className="ml-3 text-sm text-gray-600 cursor-pointer flex justify-between w-full"
                >
                  <span>{brand.label}</span>
                  {brand.count !== undefined && (
                    <span className="text-gray-500 ml-2">
                      {brand.count}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Faixa de preço */}
      <div className="border-b border-gray-200 pb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h4 className="font-medium text-gray-900">Preço</h4>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-500 transition-transform ${
              openSections.price ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </div>
        {openSections.price && (
          <div className="mt-4 space-y-2">
            {filters.priceRanges.map((range) => (
              <div
                key={range.value}
                className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                  selectedPriceRange === range.value
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handlePriceRangeChange(range.value)}
              >
                <div className="flex items-center h-5">
                  <input
                    id={`price-${range.value}`}
                    name="price"
                    type="radio"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedPriceRange === range.value}
                    onChange={() => {}}
                  />
                </div>
                <label
                  htmlFor={`price-${range.value}`}
                  className="ml-3 text-sm text-gray-600 cursor-pointer flex justify-between w-full"
                >
                  <span>{range.label}</span>
                  {range.count !== undefined && (
                    <span className="text-gray-500 ml-2">
                      {range.count}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isMobile && hasActiveFilters && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}
