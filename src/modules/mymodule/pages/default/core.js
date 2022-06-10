import React from 'react';
import Layout from '@layout';
import { getAllProducts } from '@core_modules/mymodule/services/graphql';
import Card from '@core_modules/mymodule/pages/default/components/card';

const CoreDefault = (props) => {
    const { data, loading } = getAllProducts();

    const config = {
        title: 'My Module Title',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'My Module Header Title',
        bottomNav: false,
    };

    if (loading) {
        return 'loading...';
    }

    return (
        <Layout pageConfig={config} {...props}>
            <h1 style={{ textAlign: 'center' }}>Products</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data?.products.items.map((item) => (
                    <div key={item.id}>
                        <Card
                            t={item.name}
                            img={item.small_image.url}
                        />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default CoreDefault;
