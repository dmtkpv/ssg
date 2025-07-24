<!--
    Template
-->

<template>

    <a href="/" @click.prevent="navigate('')">Logo</a>

    <ul>
        <li v-for="{ key } in tags">
            <b v-if="key === state?.key">{{ key }}</b>
            <a v-else :href="`/${key}`" @click.prevent="navigate(key)">{{ key }}</a>
        </li>
    </ul>

    <p v-if="active">{{ active.content }}</p>

</template>



<!--
    Scripts
-->

<script setup lang="ts">

    import { inject, computed } from 'vue'
    import tags from './tags'

    const state = inject<Record<string, any>>('state');

    const active = computed(() => {
        return tags.find(tag => tag.key === state?.key)
    })

    function navigate (key: string) {
        history.pushState(null, '', `/${key}`);
        if (state) state.key = key;
    }

</script>