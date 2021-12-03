import { Container, SimpleGrid } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DataContext } from '../../../GlobalState'
import ProductCard from '../../utils/productCard/ProductCard'

const Products = () => {
    const state = useContext(DataContext)
    const [Products] = state.products
    return (
        <>
            <Container maxW='container.xl'>
                <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
                    {
                        Products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </SimpleGrid>
            </Container>
        </>
    )
}

export default Products
