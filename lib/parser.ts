import {Parser,Node} from "commonmark"

export class ParserMark {
    node :Node
    constructor(markdown:string){
    let reader = new Parser()
    this.node = reader.parse(markdown)
}
        Order(node: Node, level:number,choose: Node|null){
  if(node.next == null){
    if(choose == null){
      return;
    }
    choose.lastChild?.appendChild(node)
    this.Order(choose.lastChild!!.firstChild!!,level+1,null)

  }else{
    let siguiente : Node|null = null
    if(node.type == "heading"){
      if(node.level == level){
        choose = node
        choose.appendChild(new Node('document'))
        siguiente = node.next
      }else{
        siguiente = node.next
        if(choose == null){

        }else{
          choose.lastChild?.appendChild(node)
        }
      }
    }else{
      siguiente = node.next
      if (choose == null){
      }else{
        choose.lastChild?.appendChild(node)
      }
    }
      this.Order(siguiente,level,choose)
  }
}

visitorGetEvaluadores(nodo:Node){
var walker = nodo.walker();
let event, node;
  let flag1 = false
  let flag2 = false
let results:string[] = []
while ((event = walker.next())) {
  node = event.node;
  switch( node.type){
      case "text":{
        if(node.parent?.type == "paragraph"){
          if(flag1 && flag2){
              results.push(node.literal!!)
          }
        }
      }
      break
      case "item":{
        flag2 = true
      }
      break
      case "list":{
        if(node.parent?.parent?.type == "heading" && node.parent?.parent?.level == 2){
          if(node.parent.parent.firstChild?.literal?.trim() == "Evaluadores"){
            flag1 = true
          }else{
            flag1 = false
          }
        }
      }
      break
    }
}
    return results
}
  
 visitorGetContent(nodo:Node){
var walker = nodo.walker();
let event, node;
  let flag1 = false
  let flag2 = false
let results: data[] = []
    type data = {
      "type":string,
      "message":string
    }
while ((event = walker.next())) {
  node = event.node;
  switch( node.type){
      case "text":{
          if(flag1){
            results.push({type:"h1",message:node.literal!!})
          }
          if (flag1 && flag2){
            results.push({type:"paragraph",message:node.literal!!})
          }
      }
      break
      case "paragraph":{
        if(node.parent?.type == "document" && flag1){
        flag2 = true
        }
          else{

        flag2 = false
          }
      }
        break
      case "heading":{
          if(node.level == 1){
            flag1 = true
          }
          else{
            flag1 = false
          }
        }
    }
}
    return results
}
}
