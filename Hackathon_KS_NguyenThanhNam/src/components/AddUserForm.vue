<template>
    <div class="form-container">
        <h2>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h2>

        <form @submit.prevent="handleSubmit">
            <label>Name:</label>
            <input v-model="formData.name" type="text" required />

            <label>Gender:</label>
            <select v-model="formData.gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label>Date of Birth:</label>
            <input v-model="formData.dateOfBirth" type="date" required />

            <label>Email:</label>
            <input v-model="formData.email" type="email" required />

            <button type="submit">{{ isEditMode ? 'Update' : 'Add' }}</button>
            <button type="button" @click="$emit('closeForm')">Close</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
    isEditMode: Boolean,
    editUser: Object,
});

const emit = defineEmits(['closeForm', 'submitUser']);

const formData = ref({
    name: '',
    gender: 'Male',
    dateOfBirth: '',
    email: '',
});

watch(
    () => props.editUser,
    (newUser) => {
        if (newUser) {
            formData.value = { ...newUser };
        }
    },
    { immediate: true }
);

const handleSubmit = () => {
    if (props.isEditMode) {
        emit('submitUser', { ...formData.value, id: props.editUser.id });
    } else {
        emit('submitUser', formData.value);
    }
    emit('closeForm');
};
</script>

<style scoped>
.form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 10px;
}

input,
select {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

button[type="submit"] {
    background-color: #28a745;
    color: white;
}

button[type="button"] {
    background-color: #dc3545;
    color: white;
}
</style>
