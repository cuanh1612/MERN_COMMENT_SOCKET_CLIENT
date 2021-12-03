import React from 'react'
import { Button, Badge, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {FcViewDetails} from 'react-icons/fc'
const ProductCard = ({ product }) => {
    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src="https://www.kicksonfire.com/wp-content/uploads/2020/07/Nike-Air-Presto-Australia-Olympic.jpg" alt="image shose" />
            <Box display="flex" alignItems="baseline" padding="6px">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                </Badge>
            </Box>
            <Box display="flex" padding="6px" justifyContent="space-between" width="100%">
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    isTruncated
                >
                    {product.title}
                </Box>

                <Box padding="6px">
                    {product.price}$
                </Box>
            </Box>
            <Box padding="6px">
                <Link to={`/product/${product._id}`}>
                    <Button colorScheme='teal' leftIcon={<FcViewDetails/>}>Detail</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default ProductCard
