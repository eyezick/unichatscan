import * as React from 'react';
import styled from 'styled-components'
import {Wrapper, GridItem, Text, TextInput } from '../styles'
import { Comment } from '../Comment/Comment'
import { CommentDetails } from '../CommentDetails/CommentDetails'
import { CommentConfirmation } from '../CommentConfirmation/CommentConfirmation'
import { GenericMessage } from '../GenericMessage/GenericMessage'


import { Message } from '../../types/data'
import { colors } from '../../constants'
import { useState } from 'react'
import { useCallback } from 'react'

const Divider = GridItem
const MessagesContainer = styled(GridItem)`
  overflow-x: scroll;
`

const messages: Array<Message> = [
  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
  to:'somebody',
    signature: 'dfsfddsfsafd',
    time: Date.now(),
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  },
  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
    to:'somebody',
    signature: 'dfsfdewsafd',
    time: Date.now() - 86400000,
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  },
  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
    to:'somebody',
    signature: 'dfsfdesafd',
    time: Date.now(),
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  },
  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
    to:'somebody',
    signature: 'dfs3645fdsafd',
    time: Date.now(),
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  },
  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
    to:'somebody',
    signature: 'dfsf3dsafd',
    time: Date.now(),
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  },  {from: '0x29a73a7a2c3242af9f78dadffb361b361e044b6c',
    to:'somebody',
    signature: 'dfsftydsafd',
    time: Date.now(),
    cid: '32432',
    text: 'Hey Ethereum bros, what is the up'
  }
]

const submitMessageAPICall = () => Promise.resolve() //TODO update this

//TODO if I have time, add a filter to the top where we can filter from
const Main = () => {
  const [shownMessage, setShowDetails] = useState<Message | null>(null)
  const showDetails = useCallback((m) => setShowDetails(m), [setShowDetails])
  const hideDetails = useCallback(() => setShowDetails(null), [setShowDetails])
  const [shownConfirmation, setShowConfirmation] = useState(false)
  const hideConfirmation = useCallback(() => setShowConfirmation(false), [setShowConfirmation])
  const [inputValue, setInputValue] = useState('');
  const showConfirmation = useCallback((e) => e.preventDefault() || (inputValue.length && setShowConfirmation(true)), [setShowDetails, inputValue])
  const [feedback, setFeedBack] = useState('')

  const onMessageSign = useCallback((message: Message) => {
    submitMessageAPICall(message).then(success => {
      setFeedBack('Message was broadcast!')
      setInputValue('')
    }).catch(e => setFeedBack('Message was not broadcast!'))
  }, [setFeedBack, setInputValue])

  return (
  <Wrapper>
    <GridItem gridColumn={'2/3'} gridRow={'2/3'}>
      <Text size={'20px'} color={colors.text.regular}>
        UniChatScan
      </Text>
      </GridItem>
    <Divider gridColumn={'1/4'} gridRow={'3/4'} style={{borderTop: `1px solid ${colors.border.regular}`}}/>
    <MessagesContainer gridColumn={'2/3'} gridRow={'4/5'} border={`1px solid ${colors.border.regular}`}>
      {messages.map(m => (
        <Comment key={m.signature} message={m} showDetails={() => showDetails(m)}/>
      ))}
    </MessagesContainer>
    {shownMessage && <CommentDetails closeCb={hideDetails} message={shownMessage}/>}
    {shownConfirmation && <CommentConfirmation closeCb={hideConfirmation} text={inputValue} onMessageSign={onMessageSign}/>}
    {feedback && <GenericMessage text={feedback} closeCb={() => setFeedBack('')} />}
    <GridItem gridRow={'5/6'} gridColumn={'2'}>
      <form onSubmit={showConfirmation}>
        <TextInput value={inputValue} placeholder={'Broadcast a message'} onChange={e => setInputValue(e.target.value)}/>
      </form>
    </GridItem>
  </Wrapper>
)}

export default Main
