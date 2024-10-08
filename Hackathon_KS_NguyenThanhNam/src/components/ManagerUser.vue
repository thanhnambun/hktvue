<template>
    <div class="main-content">
        <h2>Manager User</h2>

        <a href="#" class="add-user-btn" @click="openAddForm">Add New User</a>

        <AddUserForm v-if="isFormVisible" :isEditMode="isEditMode" :editUser="currentUser" @closeForm="toggleForm"
            @submitUser="handleSaveUser" />

        <input type="text" v-model="keySearch" placeholder="Search by name or email..." />

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in filteredUsers" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.dateOfBirth }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <button class="btn btn-edit" @click="openEditForm(user)">Edit</button>
                            <button class="btn btn-delete" @click="handleDelete(user.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import AddUserForm from './AddUserForm.vue';

const managerUser = reactive([]);
const keySearch = ref('');

const saveUsersToLocal = () => {
    localStorage.setItem('managerUsers', JSON.stringify(managerUser));
};

const loadUsersFromLocal = () => {
    const users = localStorage.getItem('managerUsers');
    if (users) {
        const parsedUsers = JSON.parse(users);
        parsedUsers.forEach(user => managerUser.push(user));
    }
};

onMounted(() => {
    loadUsersFromLocal();
});

const isFormVisible = ref(false);
const isEditMode = ref(false);
const currentUser = ref(null);

const openAddForm = () => {
    isEditMode.value = false;
    currentUser.value = null;
    isFormVisible.value = true;
};

const openEditForm = (user) => {
    isEditMode.value = true;
    currentUser.value = { ...user };
    isFormVisible.value = true;
};

const toggleForm = () => {
    isFormVisible.value = !isFormVisible.value;
};

const handleSaveUser = (user) => {
    if (isEditMode.value) {
        const index = managerUser.findIndex(u => u.id === user.id);
        if (index !== -1) {
            managerUser[index] = user;
        }
    } else {
        managerUser.push({ ...user, id: Date.now() });
    }
    saveUsersToLocal();
    toggleForm();
};

const handleDelete = (userId) => {
    const index = managerUser.findIndex(user => user.id === userId);
    if (index !== -1) {
        managerUser.splice(index, 1);
        saveUsersToLocal();
    }
};

const filteredUsers = computed(() => {
    return managerUser.filter(user => {
        return user.name.toLowerCase().includes(keySearch.value.toLowerCase()) ||
            user.email.toLowerCase().includes(keySearch.value.toLowerCase());
    });
});

;
</script>

<style scoped>
.main-content {
    flex-grow: 1;
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
}

.add-user-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 20px;
}

.table-container {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
}

table,
th,
td {
    border: 1px solid #ddd;
}

th,
td {
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.btn {
    padding: 8px 12px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.btn-edit {
    background-color: #007bff;
}

.btn-delete {
    background-color: #dc3545;
}
</style>
