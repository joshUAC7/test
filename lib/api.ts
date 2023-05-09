import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { json } from 'stream/consumers'

const indicatorsDirectory = join(process.cwd(),'__Indicadores')

const mainDataDirectory = join(process.cwd(),'__Programa')
export function getIndicatorsSlugs(){
  return fs.readdirSync(indicatorsDirectory)
}

export function getIndicatorBySlug(slug:String){
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(indicatorsDirectory,`${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath,'utf8')
  const {data, content} = matter(fileContents)
type Items = {
    [key: string]: string
  }

const items: Items = {}

  const fields = ["slug","content"]
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content'){
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllIndicators(){
  const indicators = getIndicatorsSlugs()
  return indicators.map((slug)=>getIndicatorBySlug(slug))
}

export function getMainData(){
 const fileContent = fs.readFileSync(join(mainDataDirectory,'data.json'),'utf-8')
  console.log(fileContent)
  const fileConvert = JSON.parse(fileContent)
  return fileConvert
}
