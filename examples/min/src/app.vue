<!--
    Template
-->

<template>
    <div>Version: {{ state.version }}</div>
</template>



<!--
    Scripts
-->

<script setup lang="ts">

    import { inject } from 'vue'
    const state = inject('state');

</script>