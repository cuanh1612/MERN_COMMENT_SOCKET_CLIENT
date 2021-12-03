import React from 'react'
import ReactStars from 'react-stars'
import {chakra} from '@chakra-ui/react'

const rating = ({ product }) => {
    const ChakraStars = chakra(ReactStars)
    return (
        <ChakraStars
            count={5}
            value={product.rating / product.numReviews}
            size={24}
            color2={'teal'} 
            edit={false}
            padding="6px"
        />
    )
}

export default rating
