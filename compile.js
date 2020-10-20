class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el)
        this.vm = vm;
        const fragment = this.node2Fragment(this.el);//获取当前的文档碎片对象，减少页面重流与重绘,这个时候el
        // console.log(this.el);这个时候el只有根节点了
        //console.log(fragment);
        //现在拿到了文档碎片对象，让我们来编译模板
        this.compile(fragment);
        //现在需要将已经编译完的子元素添加到根节点，进行渲染
        this.el.appendChild(fragment);
    }
    isElementNode(node){ //判断是否为元素节点
        return node.nodeType === 1;
    }
    node2Fragment(el){//此时传入的是根节点
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild);
        }
        return f;
    }
    isDirective(name){//判断是否为一个vue指令
        return name.startsWith('v-');//判断是否为v-开头
    }
    compileElement(node){//编译元素节点
        const attributes = node.attributes;
        // console.log(node.attributes);
        [...attributes].forEach(attr=>{
            const {name,value} = attr;
            if(this.isDirective(name)){//判断是否为一个vue指令
                const [,dirctive] = name.split('-');//比如拿到了model
                compileUtil[dirctive](node,value,this.vm);//进行指令的编译
                 //我们已经拿到指令，此时需要把指令从标签属性中进行删除
                node.removeAttribute('v-'+dirctive);
            }
        })
    }
    compile(fragment){//编译节点
        const childNodes = fragment.childNodes;
        //console.log(childNodes);会拿到所有的节点，其中包括了元素节点、文本节点等等
        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){//元素节点
                this.compileElement(child);
            }else{
                //文本节点
            }
        })
    }
}