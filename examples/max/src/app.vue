<!--
    Template
-->

<template>
    <div>Version: {{ state.version }}</div>
    <ul>
        <li>
            <router-link to="/">Home</router-link>
        </li>
        <li>
            <router-link to="/info">Info</router-link>
        </li>
    </ul>
    <router-view />
</template>



<!--
    Scripts
-->

<script setup lang="ts">

    import { inject } from 'vue'
    const state = inject('state');

</script>