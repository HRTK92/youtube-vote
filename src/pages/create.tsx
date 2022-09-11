import { Button, Card, Grid, Input, Radio, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import Router from 'next/router'
type helperType = {
  text: string
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const Home: NextPage = () => {
  const [progress, setProgress] = useState<'URL' | 'composer' | 'genre' | 'hook' | 'confirmation'>(
    'URL'
  )
  const [ytUrl, setYtUrl] = useState<string>('')
  const [composer, setComposer] = useState<string>('')
  const [genre, setGenre] = useState<string>('ゲーム')
  const [hook, setHook] = useState<string>('')
  const [isNext, setIsNext] = useState<boolean>(false)
  const [showSubmit, setShowSubmit] = useState<boolean>(false)

  const validateYoutubeUrl = (value: string) => {
    return value.match(/^https:\/\/youtu.be\/(.*)/i)
  }

  const helper = useMemo(() => {
    if (!ytUrl)
      return {
        text: '',
        color: 'default',
      } as helperType
    const isValid = validateYoutubeUrl(ytUrl)
    return {
      text: isValid ? 'Correct URL' : 'Enter a valid URL',
      color: isValid ? 'success' : 'error',
    } as helperType
  }, [ytUrl])

  const nextForm = () => {
    const list: Array<'URL' | 'composer' | 'genre' | 'hook' | 'confirmation'> = [
      'URL',
      'composer',
      'genre',
      'hook',
      'confirmation',
    ]
    setProgress(list[list.indexOf(progress) + 1] || 'URL')
  }
  const genres = [
    { key: 'game', name: 'ゲーム' },
    { key: 'anime', name: 'アニメ' },
    { key: 'jpop', name: 'J-POP' },
    { key: 'western', name: '洋楽' },
  ]
  const send = async () => {
    await fetch(
      '/api/create?' +
        new URLSearchParams({ url: ytUrl, composer: composer, genre: genre, hook: hook }),
      {
        method: 'POST',
      }
    )
    await Router.push('/')
  }

  return (
    <>
      <Head>
        <title>CDを追加</title>
      </Head>

      <Grid.Container justify='center'>
        <Card css={{ width: 350, margin: 20 }}>
          <Card.Body>
            {progress === 'URL' && (
              <>
                <Input
                  type='url'
                  label='YouTube URL'
                  placeholder='https://youtu.be/'
                  status={helper.color}
                  color={helper.color}
                  helperColor={helper.color}
                  helperText={helper.text}
                  onChange={(e) => setYtUrl(e.target.value)}
                  css={{ margin: 20 }}
                />
              </>
            )}
            {progress === 'composer' && (
              <>
                <Input
                  type='text'
                  label='作曲者'
                  onChange={(e) => setComposer(e.target.value)}
                  css={{ margin: 20 }}
                />
              </>
            )}
            {progress === 'genre' && (
              <>
                <Radio.Group value={genre} onChange={(e) => setGenre(e)}>
                  {genres.map((genre) => {
                    return (
                      <Radio key={genre.key} value={genre.name} size='sm'>
                        {genre.name}
                      </Radio>
                    )
                  })}
                </Radio.Group>
              </>
            )}
            {progress === 'hook' && (
              <>
                <Input
                  type='number'
                  label='サビが終わる時間'
                  labelRight='秒'
                  onChange={(e) => setHook(e.target.value)}
                  css={{ margin: 20 }}
                />
              </>
            )}
            {progress === 'confirmation' && (
              <>
                <Text>確認</Text>
              </>
            )}
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify='flex-end'>
              {progress === 'confirmation' ? (
                <>
                  <Button onClick={send} auto>
                    送信
                  </Button>
                </>
              ) : (
                <Button size='sm' onClick={nextForm} auto>
                  Next
                </Button>
              )}
            </Row>
          </Card.Footer>
        </Card>

        {progress !== 'URL' && (
          <Card css={{ width: 350, margin: 20 }}>
            <Card.Body>
              <iframe
                src={`https://www.youtube.com/embed/${ytUrl.replace(
                  'https://youtu.be/',
                  ''
                )}?autoplay=1`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </Card.Body>
          </Card>
        )}
      </Grid.Container>
    </>
  )
}

export default Home
