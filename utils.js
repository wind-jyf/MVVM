const compileUtil = {
    getVal(name,vm){
        return vm.$data[name]; //其实还需要考虑嵌套的情况，这里简化操作了
    },
    setVal(name,vm,newVal){
        vm.$data[name] = newVal;
        
    },
    model(node,name,vm){
        let value = this.getVal(name,vm);
        new Watcher(vm,name,(newVal)=>{
            this.updater.modelUpdater(node,newVal);
        })
        node.addEventListener('input',e=>{
            this.setVal(name,vm,e.target.value);
        })
        this.updater.modelUpdater(node,value);
    },
    updater:{
        modelUpdater(node,value){
            node.value = value;
            //console.log(node);
        }
    }
}