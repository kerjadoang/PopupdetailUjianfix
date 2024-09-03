import {useEffect, useState} from 'react';
import {Product, getProducts, requestPurchase} from 'react-native-iap';
import {Platform} from 'react-native';

//list products
const skus: any = Platform.select({
  ios: [
    'com.extramarks.smartstudy.in.tanyacoin10',
    'com.extramarks.smartstudy.in.tanyacoin5',
  ],
  android: ['id.extramarks.learningapp'],
});

const useInAppPurchase = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProducts = async () => {
    const items = await getProducts({skus});
    setProducts(items);
  };

  const buyProducts = async (item: Product) => {
    await requestPurchase({sku: item.productId});
  };

  useEffect(() => {
    void handleProducts();
  }, []);

  return {products, buyProducts};
};
export default useInAppPurchase;
