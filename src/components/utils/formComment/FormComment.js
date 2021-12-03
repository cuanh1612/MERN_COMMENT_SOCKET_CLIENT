import React, { useRef, useState } from 'react'
import { Box, chakra, FormControl, FormLabel, useToast, Input, Textarea, Button, Flex } from '@chakra-ui/react'
import ReactStars from 'react-stars'
import { AiOutlineSend } from 'react-icons/ai'
import { patchData } from '../FetchData'

const FormComment = ({ id, socket }) => {
    const ChakraStars = chakra(ReactStars)
    const toast = useToast()

    //state
    const [rating, setRating] = useState(0)

    //ref
    const nameRef = useRef()
    const contentRef = useRef()

    //function
    const ratingChanged = (valueStars) => {
        setRating(valueStars)
    }

    const showToast = (title, description, status) => {
        return toast({
            title: title,
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }

    const commentSubmit = () => {
        const username = nameRef.current.value
        const content = contentRef.current.value

        if (!username.trim()) return showToast(
            "Add comment",
            "Not empaty!",
            "error"
        )

        if (content.trim().length < 20)
            return showToast(
                "Add comment",
                'Contents too short, must be at least 20 characters',
                "error"
            )

        if (rating === 0)
            return showToast(
                "Add comment",
                'Please enter number rating than 0',
                "warning"
            )

        const createdAt = new Date().toISOString()
        socket.emit('createComment', {
            username, content, product_id: id, createdAt, rating
        })

        if (rating && rating !== 0) {
            patchData(`/api/products/${id}`, { rating })
                .then(res => console.log(res))

            contentRef.current.value = ''
        }
    }

    return (
        <Box>
            <Box as="p" fontWeight="800" fontSize="20px">
                Enter your review
            </Box>
            <Box as="p" fontSize="sm">
                Enter your review
            </Box>
            <ChakraStars
                count={5}
                size={24}
                color2={'teal'}
                onChange={ratingChanged}
            />
            <Box border="1px" padding="6px" borderRadius="md" borderColor="gray.300" marginTop="6px" alignItems="start">
                <FormControl id='name'>
                    <FormLabel>Your name</FormLabel>
                    <Input type='text' name="name" ref={nameRef} />
                </FormControl>
                <FormControl id='content' marginTop="6px">
                    <FormLabel>Enter content review</FormLabel>
                    <Textarea name="content" ref={contentRef} />
                </FormControl>
                <Flex justifyContent="flex-end" marginTop="6px">
                    <Button colorScheme="teal" onClick={() => commentSubmit()} rightIcon={<AiOutlineSend />}>Send</Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default FormComment
