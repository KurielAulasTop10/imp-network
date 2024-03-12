'use client';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { useRecoilState } from 'recoil';

import { pageState } from '@/states/page';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Paginate({
	totalPages,
	elementToScroll,
}: {
	totalPages: number;
	elementToScroll: HTMLElement | null;
}) {
	const [page, setPage] = useRecoilState(pageState);
	const pathname = usePathname();

	useEffect(() => {
		setPage(1);
	}, [pathname]);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage(selected + 1);

		elementToScroll &&
			elementToScroll.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
	};

	return (
		<ReactPaginate
			className="paginate"
			pageCount={totalPages}
			previousLabel={<AiOutlineLeft />}
			nextLabel={<AiOutlineRight />}
			breakLabel={<FiMoreHorizontal />}
			onPageChange={handlePageChange}
			forcePage={page - 1}
			renderOnZeroPageCount={() => null}
		/>
	);
}
