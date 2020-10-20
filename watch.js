//我们需要一个观察者，去在这个变量发生变化的时候，由这个观察者来进行相应的改变
//那这个观察者应该什么时候被创造出来呢？
//当然是当这个数据需要被我们用到的时候，它需要去驱动视图变化的时候，它的观察者就应该存在了
/**
 * 其实观察者就类似于服务员，在我们去饭店包间吃饭的时候，一个包间会有一个专属的服务员
 * 但我们有时也会预定包间，只有我们去到这个包间的时候，服务员才会专门为我们服务。而观察者也同理
 */
class Watcher{
    constructor(vm,name,cb){ //name是属性名称，cb是回调函数，回调函数即主要用于试图的重新渲染
        this.vm = vm;
        this.name = name;
        this.cb = cb;
        this.oldVal = this.getOldVal();//先把旧值保存起来
    }
    update(){
        const newVal = compileUtil.getVal(this.name,this.vm);
        if(newVal!==this.oldVal){
            this.cb(newVal);
            this.oldVal = newVal;
        }
    }
    getOldVal(){
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.name,this.vm);
        Dep.target = null;
        return oldVal;
    }
}

//发布订阅模式，发布订阅主要就是靠数组关系，发布就是往
//数组里push，而发布就是让数组中的函数执行

class Dep{
    constructor(){
        this.subs = [];//收集watcher
    }
    addSub(watcher){//添加观察者
        this.subs.push(watcher);
    }
    notify(){//通知所有的观察者去执行更新函数
        this.subs.forEach(item=>{
            item.update();
        })
    }
}