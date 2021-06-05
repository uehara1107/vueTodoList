// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
    el: '#app',
    data: {
        todos: [],
        curret: -1,
        options: [
            {value: -1, label:'すべて'},
            {value: 0, label: '作業中'},
            {value: 1, label: '完了'}
        ]
    },
    methods: {
        //ToDo 追加の処理
        doAdd: function(event, value){
            var comment = this.$refs.comment
            if (!comment.value.length){
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value = ''
        },

        doChangeState: function(item){
            item.state = !item.state ? 1 : 0
        },

        doRemove: function(item){
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },

    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    },

    coreated() {
        this.todos = todoStorage.fetch()
    },

    computed:{
        labels(){
            return this.options.reduce(function(a, b){
                return Object.assign(a, { [b.value]: b.label })
            }, {})
        },

        computedTodos: function(){
            return this.todos.filter(function(el){
                return this.curret< 0 ? true : this.curret === el.state
            }, this)
        }
    }

})
