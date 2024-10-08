<template>
  <div class="container">
    <!-- Header Section -->
    <div class="header">Header</div>

    <div class="main-content">
      <!-- Sidebar Section -->
      <div class="sidebar">
        <router-link to="/admin" class="nav-link" :class="{ active: isActive('/admin') }">
          Dashboard
        </router-link>
        <ul>
          <li>
            <router-link to="/admin/manager-user" class="nav-link" :class="{ active: isActive('/admin/manager-user') }">
              Manager User
            </router-link>
          </li>
          <li>
            <router-link to="/admin/manager-product" class="nav-link"
              :class="{ active: isActive('/admin/manager-product') }">
              Manager Product
            </router-link>
          </li>
        </ul>
      </div>

      <div class="user-section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isActive = (path) => computed(() => route.path.startsWith(path));
</script>

<style scoped>
.container {
  display: flex;
}

.main-content {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  padding: 20px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  background-color: #333;
  color: white;
  padding: 20px;
  height: 100vh;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 5px;
}

a:hover {
  background-color: #575757;
}

.active {
  background-color: #007bff;
}

.header {
  background-color: #ccc;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.user-section {
  margin-top: 20px;
}
</style>
