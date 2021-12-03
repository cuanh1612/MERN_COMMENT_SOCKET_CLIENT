import { Badge, Box, Button, Center, Container, Image, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../../GlobalState'
import CommentItem from '../../utils/commentItem/CommentItem'
import { getData } from '../../utils/FetchData'
import FormComment from '../../utils/formComment/FormComment'
import Rating from '../../utils/rating/rating'

const DetailProduct = () => {
    const { id } = useParams()

    console.log(id);

    const state = useContext(DataContext)
    const [products] = state.products

    //state
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        getData(`/api/comments/${id}?limit=${page * 3}`)
            .then(res => {
                setComments(res.data.comments)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response.data.msg)
            })
    }, [id, page])

    //setup socket 5
    const socket = state.socket

    const [detailProduct, setDetailProduct] = useState([])

    //setup socket 6
    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', id)
        }
    }, [socket, id])

    //setup socket 7
    useEffect(() => {
        if (socket) {
            socket.on('sendCommentToClient', msg => {
                console.log(msg);
                setComments([msg, ...comments])
            })

            return () => socket.off('sendCommentToClient')
        }
    }, [socket, comments])

    useEffect(() => {
        setDetailProduct(products.filter(product => product._id === id))
    }, [id, products])

    // infiniti scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1)
            }
        }, {
            rootMargin: '0px',
            threshold: 0.1
        })

        observer.observe(document.querySelector('#buttonscroll'))

        // return () => observer.unobserve(document.querySelector('#buttonscroll'))
    }, [])

    //Reply Comments
    useEffect (() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]

                newArr.forEach(cm => {
                    if(cm._id === msg._id){
                        cm.reply = msg.reply
                    }
                })

                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        }
    }, [socket, comments])

    return (
        <>
            {
                detailProduct.map(product => (
                    <Container maxW='container.xl'>
                        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
                            <Image src="https://www.kicksonfire.com/wp-content/uploads/2020/07/Nike-Air-Presto-Australia-Olympic.jpg" alt="image shose" />
                            <Box borderRadius='lg' overflow='hidden'>
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

                                <Box display='flex' mt='2' alignItems='center'>
                                    <Rating product={product} />
                                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                        {product.numReviews} reviews
                                    </Box>
                                </Box>

                                <Box as='p' ml='2'>
                                    {product.description} reviews
                                </Box>

                                <Box padding="6px">
                                    <Button colorScheme='teal' leftIcon={<AiOutlineShoppingCart />}>Buy</Button>
                                </Box>
                            </Box>
                        </SimpleGrid>

                        <Box marginTop="20px">
                            {/* setup socket 5 */}
                            <FormComment id={product._id} socket={socket} />
                        </Box>

                        <Box>
                            {
                                comments.map(comment => (
                                    <CommentItem key={comment._id} comment={comment} socket={socket} id={id} />
                                ))
                            }
                        </Box>

                    </Container>
                ))
            }
            {
                loading && (
                    <Center>
                        <Button
                            isLoading
                            loadingText='Load more ...'
                            colorScheme='teal'
                            variant='ghost'
                        >
                            Load more ...
                        </Button>
                    </Center>
                )
            }

            <div id="buttonscroll" style={{ opacity: 0 }}></div>
        </>
    )
}

export default DetailProduct
