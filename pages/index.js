import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";

export default function HomePage({featuredProduct, newProducts}) {
    return (
        <div>
            <Header/>
            <Featured product={featuredProduct}/>
            <NewProducts products={newProducts}/>
        </div>
    );
}

export async function getServerSideProps() {
    const featuredProductId = '66b1e4d5d208138e33fe7306';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10});
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
    };
}