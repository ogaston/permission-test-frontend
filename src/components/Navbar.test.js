import { mount } from "@vue/test-utils";
import Navbar from "./Navbar.vue";

describe("Navbar", () => {
  it("renders a nav", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find("nav")).toBeTruthy();
  });

  it("renders the title into the nav", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.text()).toContain("Permissions Manager");
  });
});
