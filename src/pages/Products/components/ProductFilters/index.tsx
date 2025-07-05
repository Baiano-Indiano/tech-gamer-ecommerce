import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.white};
  color: ${({ active, theme }) => 
    active ? theme.colors.white : theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (category: string) => void;
  activeCategory: string;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  onFilterChange,
  activeCategory,
}) => {
  return (
    <FiltersContainer>
      <FilterButton
        active={!activeCategory}
        onClick={() => onFilterChange('')}
      >
        Todos
      </FilterButton>
      {categories.map((category) => (
        <FilterButton
          key={category}
          active={activeCategory === category}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};

export default ProductFilters;
