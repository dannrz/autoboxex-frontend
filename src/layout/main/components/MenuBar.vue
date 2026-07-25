<template>
    <Menubar :model="items">
        <template #start>
            <Button icon="pi pi-bars" @click="emit('visibility', !visible)" severity="contrast" />
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" active-class="bg-blue-500"
                custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
            </a>
        </template>
        <template #end>
            <div class="flex items-center gap-5">
                <OverlayBadge :value="badgeValue" severity="contrast" class="cursor-pointer"
                    @click="toggleNotification">
                    <i class="pi pi-bell" />
                </OverlayBadge>
                <ModeToggler />
                <Avatar id="avatar" :label="avatarLabel" shape="circle" @click="toggle" />
                <Popover ref="op">
                    <UserPopover :label="props.avatarLabel" :closeSession="closeSession" :load="load" />
                </Popover>
                <Popover ref="op2">
                    <NotificationPopover :requests="requests" />
                </Popover>
            </div>
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Menubar, Popover } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import { ModeToggler, UserPopover, NotificationPopover } from '.';
import { useMenu } from '../composables/useMenu';
import { useLogin } from '@/layout/login/composables/useLogin';

const { overlayBadge, badgeValue, toggle, toggleNotification, op, op2, requests } = useMenu();
const { closeSession, load } = useLogin();

const props = defineProps<{
    visible: boolean;
    items: Array<MenuItem>;
    avatarLabel?: string;
}>();

const emit = defineEmits<{
    visibility: [value: boolean]
}>();

onMounted(() => {
    overlayBadge();
});
</script>