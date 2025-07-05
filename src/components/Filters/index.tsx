import React, { useState } from 'react';
import styled from 'styled-components';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { FilterGroup } from '../../types';

const FiltersContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.4rem;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const FilterGroupContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.6rem;
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.2rem;
`;

const GroupTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const OptionsList = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin-top: 1rem;
`;

const OptionItem = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Checkbox = styled.input`
  margin-right: 0.8rem;
  width: 1.6rem;
  height: 1.6rem;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const RangeInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1.4rem;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.6rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

interface FiltersProps {
  filters: FilterGroup[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  onClearFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    filters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: true,
    }), {})
  );

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentValues = prev[groupId] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);

      const newFilters = {
        ...prev,
        [groupId]: newValues,
      };

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    onClearFilters();  };

  return (
    <FiltersContainer>
      <FilterHeader>
        <FilterTitle>
          <FiFilter /> Filtros
        </FilterTitle>
        <ClearButton onClick={handleClearFilters}>
          <FiX /> Limpar
        </ClearButton>
      </FilterHeader>

      {filters.map(filter => (
        <FilterGroupContainer key={filter.id}>
          <GroupHeader onClick={() => toggleGroup(filter.id)}>
            <GroupTitle>{filter.name}</GroupTitle>
            {openGroups[filter.id] ? <FiChevronUp /> : <FiChevronDown />}
          </GroupHeader>
          <OptionsList $isOpen={openGroups[filter.id]}>
            {filter.type === 'range' ? (
              <RangeInputs>
                <RangeInput
                  type="number"
                  placeholder="Mínimo"
                  onChange={e =>
                    handleFilterChange(filter.id, `min:${e.target.value}`, true)
                  }
                />
                <RangeInput
                  type="number"
                  placeholder="Máximo"
                  onChange={e =>
                    handleFilterChange(filter.id, `max:${e.target.value}`, true)
                  }
                />
              </RangeInputs>
            ) : (
              filter.options.map(option => (
                <OptionItem key={option.id}>
                  <Checkbox
                    type={filter.type}
                    name={filter.id}
                    value={option.value}
                    checked={selectedFilters[filter.id]?.includes(option.value) || false}
                    onChange={e =>
                      handleFilterChange(
                        filter.id,
                        option.value,
                        e.target.checked
                      )
                    }
                  />
                  {option.name} ({option.count})
                </OptionItem>
              ))
            )}
          </OptionsList>
        </FilterGroupContainer>
      ))}
      <ApplyButton onClick={() => onFilterChange(selectedFilters)}>
        Aplicar Filtros
      </ApplyButton>
    </FiltersContainer>
  );
};

export default Filters;
