import { Button, Table } from '@nextui-org/react'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from "swr"
import Router from 'next/router'

type music = {
  id: string
  url: string
  composer: string
  genre: string
  hook: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data } = useSWR('/api/list', fetcher)
  const musicList:Array<music> = data
  return (
    <>
      <Button css={{ margin: 10 }} onClick={() => Router.push('/create')}>
        追加
      </Button>

      <Table
        aria-label='曲リスト'
        css={{
          height: 'auto',
          minWidth: '100%',
          margin: 20,
        }}
      >
        <Table.Header>
          <Table.Column>URL</Table.Column>
          <Table.Column>作曲者</Table.Column>
          <Table.Column>ジャンル</Table.Column>
        </Table.Header>
        <Table.Body>
          {musicList &&
            musicList.map((music, index) => (
              <Table.Row key={index}>
                <Table.Cell><a href={music.url}>{music.url}</a></Table.Cell>
                <Table.Cell>{music.composer}</Table.Cell>
                <Table.Cell>{music.genre}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  )
}
export default Home
