'use client';

import { useRecoilState } from 'recoil';

import Category from '@/components/filter/category';
import { categoriesState } from '@/states/categories';
import SearchBar from './search-bar';

export default function CategoryFilter({
  allCategories,
}: {
  allCategories: string[];
}) {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const clearAllActive = categories.selected.length > 0;

  const handleClearAll = () => {
    setCategories({
      selected: [],
      active: [],
    });
  };

  return (<SearchBar />
  );
}
