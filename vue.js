class Vue{
    constructor(options){
        this.options = options;
        this.$el = options.el;//拿到所在节点的id值
        this.$data = options.data;//拿到数据对象
        if(this.$el){
            new Observe(this.$data);
            new Compile(this.$el,this);
            this.proxyData(this.$data);
            console.log(this.msg);
        }
    }
    proxyData(data){
        for(const key in data){
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}
