<script setup>
import api from '@/api'
import { useAuthStore } from '@/stores/auth'
import { errorHandler, Toast } from '@/utils'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

// 切換「全部／待完成／已完成」分頁
const currentTab = ref('all')
const activeTab = ref({
  all: 'active',
  todo: '',
  done: ''
})

/**
 * 切換分頁
 * @param {'all' | 'todo' | 'done'} tab 
 */
const switchTab = (tab) => {
  Object.keys(activeTab.value).forEach(key => {
    activeTab.value[key] = key === tab ? 'active' : ''
  })
  currentTab.value = tab
}

// Todos 資料
const todos = ref([])
const filteredTodos = computed(() => {
  if (currentTab.value === 'todo') {
    return todos.value.filter(todo => todo.status === false)
  } else if (currentTab.value === 'done') {
    return todos.value.filter(todo => todo.status === true)
  } else {
    return todos.value
  }
})
// 計算已完成數量
const doneCount = computed(() => {
  return todos.value.filter(todo => todo.status).length
})

// 取得 todos
async function getTodos() {
  try {
    const { data } = await api.todos.get()
    todos.value = data.data
  } catch (error) {
    errorHandler(error)
  }
}

// 新增 todo
const newTodoContent = ref('')
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

// 切換 todo 狀態
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

// 刪除 todo
async function deleteTodo(todo) {
  try {
    await api.todos.delete(todo.id) // 刪除 API
    getTodos() // 刷新資料
    Toast('success', `已刪除：${todo.content}`)
  } catch (error) {
    errorHandler(error)
  }
}

// 編輯 todo
const edittingTodo = ref()
const edittingContent = ref('')

function editTodo(todo) {
  edittingTodo.value = todo
  edittingContent.value = todo.content
}

async function saveEdit(todo) {
  try {
    // 如果內容沒有差異，則不 call API 更新
    if (todo.content === edittingContent.value) {
      return (edittingTodo.value = null)
    }

    await api.todos.put(todo.id, edittingContent.value) // API 更新 Todo
    edittingTodo.value = null // 清空編輯狀態
    await getTodos() // 刷新資料
    Toast('success', '更新成功')
  } catch (error) {
    errorHandler(error)
  }
}

// 登出
async function handleLogout() {
  await authStore.logout()
  Toast('success', '您已登出')
  router.push('/login')
}

// 頁面掛載時，驗證登入狀態並取得資料
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
            <li><a href="#" :class="activeTab.all" @click.prevent="switchTab('all')">全部</a></li>
            <li><a href="#" :class="activeTab.todo" @click.prevent="switchTab('todo')">待完成</a></li>
            <li><a href="#" :class="activeTab.done" @click.prevent="switchTab('done')">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <p v-if="todos.length === 0">目前尚無待辦事項</p>
            <ul class="todoList_item">
              <li v-for="todo in filteredTodos" :key="todo.id">
                <label class="todoList_label" v-if="edittingTodo && edittingTodo.id === todo.id">
                  <input 
                    class="todoList_input_edit"
                    type="text"
                    v-model="edittingContent"
                  />
                </label>
                <label class="todoList_label" v-else>
                  <input class="todoList_input" type="checkbox" v-model="todo.status" @change="toggleTodo(todo)"/>
                  <span>{{ todo.content }}</span>
                </label>
                <div class="todo_btn_group edit_btn_group" v-if="edittingTodo && edittingTodo.id === todo.id">
                  <a href="#" @click.prevent="saveEdit(todo)">
                    <i class="fa-solid fa-circle-check fa-lg"></i>
                  </a>
                  <a href="#" @click.prevent="edittingTodo = null">
                    <i class="fa-solid fa-circle-xmark fa-lg"></i>
                  </a>
                </div>
                <div class="todo_btn_group nomal_btn_group" v-else>
                  <a href="#" @click.prevent="editTodo(todo)">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </a>
                  <a href="#" @click.prevent="deleteTodo(todo)">
                    <i class="fa-solid fa-trash-can fa-lg"></i>
                  </a>
                </div>
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
