import data from "./data";
import ShopItem from "./_components/shop-item";

export default function Shop() {
	return (
		<div className="w-full h-full p-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.map((item) => (
					<ShopItem key={item.id} price={400} discountPrice={500} {...item} />
				))}
			</div>
		</div>
	);
}
