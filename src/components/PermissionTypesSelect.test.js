import { mount } from "@vue/test-utils";
import PermissionTypesSelect from "./PermissionTypesSelect.vue";

test("displays option passed", () => {
  const wrapper = mount(PermissionTypesSelect, {
    propsData: {
      recordSelected: {
        id: 1,
        description: "Opcion1",
      },
    },
  });

  expect(wrapper.text()).toContain("Opcion1");
});
