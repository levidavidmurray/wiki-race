<template>
    <n-popover
        placement="bottom"
        trigger="hover"
    >
        <template #trigger>
            <div
                class="page-indicator"
                ref="pageIndicator"
                :class="{ large, active, step }"
                :style="{ backgroundImage: `url(${page.thumbnail?.source})`, left: `${left}px` }"
            ></div>
        </template>
        <span class="block font-semibold">{{ page.title }}</span>
        <span class="text-xs">{{ page.description }}</span>
    </n-popover>
</template>

<script lang="ts" setup>
import { NPopover } from 'naive-ui'
import { Ref } from 'vue';
import { WikiPageDisplay } from '~/types/wiki';

const { page, large, step, active, left } = defineProps<{
    page: WikiPageDisplay;
    large?: boolean;
    step?: boolean;
    active?: boolean;
    left?: number;
}>()

const pageIndicator: Ref<HTMLDivElement> = ref()

onMounted(() => {
    if (!step) return
    setTimeout(() => {
        $anime({
            targets: pageIndicator.value,
            duration: 500,
            scale: [0, 1],
        })
    }, 100)
})

</script>

<style scoped>

.page-indicator {
    @apply rounded-full bg-neutral-400 relative z-10 bg-cover bg-no-repeat bg-center box-content border-2 border-neutral-300;
    --size: 20px;
    height: var(--size);
    width: var(--size);
}

.page-indicator.large {
    @apply bg-neutral-400 border-neutral-400 border-4 z-20;
    --size: 32px;
}

.page-indicator.step {
    @apply absolute inset-y-0 my-auto;
    transform: scale(0);
}

.page-indicator.active {
    @apply border-solid border-blue-600;
}
.page-indicator.active:not(.large) {
    --size: 24px;
}

</style>