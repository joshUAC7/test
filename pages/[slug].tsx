import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { getAllIndicators, getIndicatorBySlug } from '@/lib/api'
import {ParserMark} from "../lib/parser"
import Layout from '@/components/layout'
import Card from "@/components/buttonCard"
import {AppContext} from "../AppContext"
import {dataStore,ContextType} from "../types/store"
import { useContext, useRef, useState } from 'react'
type Props = {
  post: {
    slug:string,
    title:string,
    message:string,
    evaluadores:string[]
  }
}

export default function Post({ post }: Props) {
  console.log("render")
  console.log(post.slug)
  const router = useRouter()
  const {data} = useContext(AppContext) as ContextType
  console.log(data)

  const [idxEvaluator,setIdxEvaluator] = useState(0)

  const nextIdxEvaluator = ()=>{
    setIdxEvaluator(idxEvaluator +1)

  }

  const prevIdxEvaluator = ()=>{
    setIdxEvaluator(idxEvaluator -1)
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div>
    {router.isFallback ? (
          <div>Loading…</div>
        ) : 
          <Layout>
              <Head>
                <title>{post.title}</title>
              </Head>
            <h1>{post.title}</h1>
            <p>
            {post.message}
          </p>
            <Card title={post.title}></Card>
            <button onClick={prevIdxEvaluator}> GAAAA</button>
            <button onClick={nextIdxEvaluator}> GEEEE</button>
          </Layout>

  }
</div>
  )
}
type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {

  const post = getIndicatorBySlug(params.slug)
  let ga = new ParserMark(post.content)

  ga.Order(ga.node.firstChild!!,1,null)

  let results=ga.visitorGetContent(ga.node)
  
  return {
    props:{
      post:{
        title:results[0]["message"],
        slug:params.slug,
        message:results[1]["message"],
        evaluadores:ga.visitorGetEvaluadores(ga.node)
      }
    }
  }
}

export async function getStaticPaths() {

  const posts = getAllIndicators()

  return{
    paths: posts.map((post)=>{
      return {params:{
        slug: post.slug
      }}
    }),
 fallback: false,
  }

}
