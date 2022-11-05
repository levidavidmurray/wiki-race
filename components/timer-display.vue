<template>
    <div class="font-semibold">
        <span class="inline-block text-center" style="min-width: 19px;">{{ timeDisplay.minutes }}</span>
        <span>:</span>
        <span class="inline-block text-center" style="min-width: 19px;">{{ timeDisplay.seconds }}</span>
        <span>.</span>
        <span class="inline-block text-center" style="width: 19px;">{{ timeDisplay.milliseconds }}</span>
    </div>
</template>

<script lang="ts" setup>
import { UnwrapNestedRefs } from 'vue';
import { TimeDisplayType } from '~/utils/helpers';

    const { timeDisplay } = defineProps<{ timeDisplay: UnwrapNestedRefs<TimeDisplayType> }>()
</script>
