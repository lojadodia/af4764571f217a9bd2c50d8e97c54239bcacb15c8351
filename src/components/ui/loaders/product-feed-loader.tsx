import ProductCardLoader from '@components/ui/loaders/product-card-loader';

interface Props {
	limit?: number;
}

const ProductFeedLoader = ({ limit = 3 }: Props) => {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3'>
			{Array.from({ length: limit }).map((_, idx) => (
				<ProductCardLoader key={idx} uniqueKey={idx} />
			))}
		</div>
	);
};

export default ProductFeedLoader;
