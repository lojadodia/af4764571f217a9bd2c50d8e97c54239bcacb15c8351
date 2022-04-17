import ContentLoader from 'react-content-loader';

const ProductCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={'100%'}
		height={'500px'}
		viewBox="0 0 480 880"
		backgroundColor="#e0e0e0"
		foregroundColor="#cecece"
		y="-100"
		className='product-card cart-type-neon dark:bg-neutral-700 rounded h-full bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5'
		{...props}
	>
		<rect width="440" y="20" x="20" height="500" />
		<rect x="20" y="590" width="30%" height="40" />
		<rect x="20" y="670" width="60%" height="40" />
		<rect x="20" y="760" width="440" height="100" />
	</ContentLoader>
);

export default ProductCardLoader;
