import React from "react";
import { shallow, mount } from "enzyme";

import GuessCount from "./guess-count";

describe("<GuessCount />", () => {
  it("Renders without crashing", () => {
    shallow(<GuessCount />);
  });
  it("Renders the count id initially", () => {
    const wrapper = shallow(<GuessCount />);
    expect(wrapper.find("#count")).length;
  });
  it("Renders the text", () => {
    const text = "You've made  guesses!";
    const wrapper = shallow(<GuessCount text={text} />);
    expect(wrapper.text()).toEqual(text);
  });
  //same as above but more accurate testing a value that was entered rather than just text output
  it("Renders the correct guess count", () => {
    const value = 5;
    const wrapper = shallow(<GuessCount guessCount={value} />);
    expect(wrapper.text()).toEqual(`You've made ${value} guesses!`);
  });
});
