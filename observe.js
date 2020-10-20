class Observe{
    constructor(data){
        this.observe(data);
    }
    observe(data){
        if(data && typeof data === "object"){
            Object.keys(data).forEach(key=>{
                this.definReactive(data,key,data[key]);
            })
        }
    }
    definReactive(data,key,value){
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get(){
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                this.observe(newVal);
                if(newVal!= value){
                    value = newVal;
                    //console.log("数据要变化了")
                    dep.notify();
                }
            }
        })
    }
}