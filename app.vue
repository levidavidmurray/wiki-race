<template>
    <nuxt-layout>
        <n-config-provider>
            <n-message-provider>
                <n-dialog-provider>
                    <div class="relative">
                        <div v-if="gameState.loading" class="fixed w-full h-full top-0 left-0">
                            <div class="w-full h-full flex justify-center items-center">
                                <n-spin size="large"></n-spin>
                            </div>
                        </div>
                        <nuxt-page />
                    </div>
                </n-dialog-provider>
            </n-message-provider>
        </n-config-provider>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import { NMessageProvider, NConfigProvider, NDialogProvider, NSpin } from 'naive-ui';
import { useGameState } from '~/store/gameState';

const gameState = useGameState()

</script>
