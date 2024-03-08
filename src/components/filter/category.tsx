'use client';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { categoriesState } from '@/states/categories';
import { pageState } from '@/states/page';
import { isTouchDevice } from '@/utils/is-touch-device';

export default function Category({ category }: { category: string }) {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setPage = useSetRecoilState(pageState);
  const checked = categories.selected.includes(category);
  const active = categories.active.includes(category);

  const handleCategoryClick = (category: string) => () => {
    setCategories((prevCategories) => {
      if (prevCategories.selected.includes(category)) {
        return {
          ...prevCategories,
          selected: prevCategories.selected.filter(
            (value) => value !== category
          ),
        };
      } else {
        return {
          ...prevCategories,
          selected: [...prevCategories.selected, category],
        };
      }
    });

    setPage(1);
  };

  return (
    <button
      onClick={handleCategoryClick(category)}
      className={`my-1 md:my-2 mr-6 cursor-pointer rounded-full px-6 py-2 ring-red-600 transition-all duration-300 ring-offset-customGray-dark ${
        checked
          ? 'ring-2 bg-white text-black'
          : 'bg-secondary'
      } ${!active && 'pointer-events-none opacity-25'} ${
        active && !isTouchDevice() && 'hover:ring-2'
      }`}
    >
      {category}
    </button>
  );
}
