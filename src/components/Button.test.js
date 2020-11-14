import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders a button", () => {
    const wrapper = mount(Button);
    expect(wrapper.find("button")).toBeTruthy();
  });
});
