import { Container, SimpleGrid, Spinner, Center } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DataContext } from '../../../GlobalState'
import ProductCard from '../../utils/productCard/ProductCard'

const Products = () => {
    const state = useContext(DataContext)
    const [Products] = state.products
    return (
        <>
            {
                Products && Products.length > 0 ? (
                    <Container maxW='container.xl'>
                        <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
                            {
                                Products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </SimpleGrid>
                    </Container>
                )
                    : (
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Center>
                    )
            }
        </>
    )
}

export default Products
