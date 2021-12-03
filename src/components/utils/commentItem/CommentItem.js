import { Avatar, Box, Button, chakra, Collapse, Flex, FormControl, FormLabel, HStack, Input, Link, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import ReactStars from 'react-stars'


const CommentItem = ({ comment, socket, id }) => {
    //ref
    const nameReplyRef = useRef()
    const contentReplyRef = useRef()

    //effect
    useEffect(() => {
        if (comment) {
            contentReplyRef.current.innerHTML = comment.username ? `${comment.username} : ` : ''
        }
    }, [comment])

    //close or open the reply
    const { isOpen, onToggle } = useDisclosure()
    //close or open the comment
    const { isOpen: isOpenComment, onToggle: onToggleComment } = useDisclosure()

    const ChakraStars = chakra(ReactStars)

    const toast = useToast()

    //Function
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

    const replySubmit = () => {
        const username = nameReplyRef.current.value
        const content = contentReplyRef.current.value
        contentReplyRef.current.value = comment.username ? `${comment.username} : ` : ''


        if (!username.trim()) return showToast(
            "Add comment",
            "Not empaty username!",
            "error"
        )

        if (content.trim().length < 20)
            return showToast(
                "Add comment",
                'Contents reply too short, must be at least 20 characters',
                "error"
            )

        const createdAt = new Date().toISOString()
        socket.emit('createComment', {
            username, content, product_id: id, createdAt, send: "replyComment", commentId: comment._id
        })

        onToggle()
    }

    return (
        <Box paddingY="20px">
            <Flex alignItems="center">
                <Avatar name={comment.username} src={`https://avatars.dicebear.com/api/micah/:${comment.username}.svg`} />
                <Box marginLeft="20px">
                    <Box as="p" fontWeight="600">
                        {comment.username}
                    </Box>
                    <ChakraStars
                        count={5}
                        value={comment.rating}
                        size={24}
                        color2={'teal'}
                        edit={false}
                    />
                </Box>
            </Flex>
            <Box borderLeft="2px solid teal" padding="10px">
                <Box as="p" fontSize="sm" color="gray.500">
                    {moment(comment.createdAt).fromNow()}
                </Box>
                <Box as="p">
                    {comment.content}
                </Box>
            </Box>

            {/* reply */}
            <Collapse in={isOpenComment} animateOpacity>
                {
                    comment.reply.length > 0 && (
                        <Box border="1px" padding="6px" marginX="12px" borderRadius="md" borderColor="gray.300" marginTop="6px" alignItems="start">
                            {
                                comment.reply.map(rep => (
                                    <Box paddingY="20px">
                                        <Flex alignItems="center">
                                            <Avatar name={rep.username} src={`https://avatars.dicebear.com/api/micah/:${rep.username}.svg`} />
                                            <Box marginLeft="20px">
                                                <Box as="p" fontWeight="600">
                                                    {rep.username}
                                                </Box>
                                            </Box>
                                        </Flex>
                                        <Box borderLeft="2px solid teal" padding="10px">
                                            <Box as="p" fontSize="sm" color="gray.500">
                                                {moment(rep.createdAt).fromNow()}
                                            </Box>
                                            <Box as="p">
                                                {rep.content}
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    )
                }
            </Collapse>

            {/* reply */}
            <Collapse in={isOpen} animateOpacity>
                <Box border="1px" padding="6px" marginX="12px" borderRadius="md" borderColor="gray.300" marginTop="6px" alignItems="start">
                    <FormControl id='name'>
                        <FormLabel>Your name</FormLabel>
                        <Input type='text' name="name" ref={nameReplyRef} />
                    </FormControl>
                    <FormControl id='content' marginTop="6px">
                        <FormLabel>Enter content review</FormLabel>
                        <Textarea name="content" ref={contentReplyRef} id="replyContent" />
                    </FormControl>
                    <Flex justifyContent="flex-end" marginTop="6px">
                        <Button colorScheme="teal" rightIcon={<AiOutlineSend />} onClick={() => replySubmit()}>Send</Button>
                    </Flex>
                </Box>
            </Collapse>

            <HStack paddingX="12px">
                <Link fontSize="sm" onClick={onToggle}>{isOpen ? ("Hide Reply") : ("Reply")}</Link>
                <Link fontSize="sm" onClick={onToggleComment}>{isOpenComment ? ("Hide Comment") : (`Show Comment (${comment.reply.length})`)}</Link>
            </HStack>
        </Box>
    )
}

export default CommentItem
