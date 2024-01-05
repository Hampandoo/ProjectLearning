import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';
import UserLayout from '../layouts/UserLayout.vue';

const layout = shallowRef(AuthLayout);

export function useLayout() {
  const route = useRoute();
  watch(
    () => route.meta,
    async (meta) => {
      try {
        const component = await import(`@/layouts/${meta.layout}.vue`);
        layout.value = component?.default || AuthLayout;
      } catch (e) {
        layout.value = AuthLayout;
      }
    }
  );

  return { layout };
}
