<script setup>
import api from '@/api'
import { useAuthStore } from '@/stores/auth'
import { errorHandler, Toast } from '@/utils'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const todos = ref([])

const newTodoContent = ref('')
// const edittingTodo = ref()
// const edittingContent = ref('')

async function getTodos() {
  try {
    const { data } = await api.todos.get()
    todos.value = data.data
  } catch (error) {
    errorHandler(error)
  }
}

async function addTodo() {
  try {
    const content = newTodoContent.value.trim()
    if (content.length === 0) {
      Toast('warning', 'Todo內容不能為空白')
      return (newTodoContent.value = '')
    }

    await api.todos.post(content)
    newTodoContent.value = ''
    getTodos()
  } catch (error) {
    errorHandler(error)
  }
}

async function toggleTodo(todo) {
  try {
    await api.todos.toggle(todo.id)
    if (todo.status) {
      Toast('success', `已完成：${todo.content}`)
    } else {
      Toast('warning', `未完成：${todo.content}`)
    }
  } catch (error) {
    errorHandler(error)
  }
}

async function deleteTodo(todo) {
  try {
    await api.todos.delete(todo.id) // 刪除 API
    getTodos() // 刷新資料
    Toast('success', `已刪除：${todo.content}`)
  } catch (error) {
    errorHandler(error)
  }
}

async function handleLogout() {
  await authStore.logout()
  Toast('success', '您已登出')
  router.push('/login')
}

const doneCount = computed(() => {
  return todos.value.filter(todo => todo.status).length
})

onMounted(async () => {
  try {
    await authStore.authCheck() // 驗證登入狀態
    if (!authStore.status) router.push('/login') // 如果驗證狀態為 false，導回登入頁
    axios.defaults.headers.common['Authorization'] = authStore.token // 設定驗證header
    await getTodos() // 取得 Todos
  } catch (error) {
    errorHandler(error)
  }
})
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <a href="#">
        <img
          class="logoImg_nav"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
          alt=""
        />
      </a>
      <ul>
        <li class="todo_sm">
          <span>{{ authStore.user }}的代辦</span>
        </li>
        <li><a href="#" @click.prevent="handleLogout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodoContent" />
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" class="active">全部</a></li>
            <li><a href="#">待完成</a></li>
            <li><a href="#">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <p v-if="todos.length === 0">目前尚無待辦事項</p>
            <ul class="todoList_item">
              <li v-for="todo in todos" :key="todo.id">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" v-model="todo.status" @change="toggleTodo(todo)"/>
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#" @click.prevent="">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
                <a href="#" @click.prevent="deleteTodo(todo)">
                  <i class="fa-solid fa-delete-left"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics" v-if="todos.length > 0">
              <p>{{ doneCount }} 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
