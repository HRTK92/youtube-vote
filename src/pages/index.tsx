import { Button, Loading, Table, Text, useAsyncList } from '@nextui-org/react'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
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
  const musicList: Array<music> = data

  async function load() {
    const res = await fetch('/api/list')
    const json = (await res.json()) as Array<music>
    return {
      items: json,
    }
  }
  const list = useAsyncList({ load })
  return (
    <>
      <Button css={{ margin: 10 }} onClick={() => Router.push('/create')}>
        追加
      </Button>
      {!data && <Loading />}
      {musicList && <Text css={{ margin: 10 }}>現在{musicList.length}曲あります</Text>}
      <Table
        aria-label='曲リスト'
        css={{
          height: 'calc($space$14 * 10)',
          minWidth: '100%',
          margin: 20,
        }}
      >
        <Table.Header>
          <Table.Column>URL</Table.Column>
          <Table.Column>作曲者</Table.Column>
          <Table.Column>ジャンル</Table.Column>
        </Table.Header>
        <Table.Body items={list.items} loadingState={list.loadingState} onLoadMore={list.loadMore}>
          {(item) => (
            <Table.Row key={item.id}>
                  <Table.Cell>
                    <a href={item.url}>{item.url}</a>
                  </Table.Cell>
                  <Table.Cell>{item.composer}</Table.Cell>
                  <Table.Cell>{item.genre}</Table.Cell>

            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}
export default Home
