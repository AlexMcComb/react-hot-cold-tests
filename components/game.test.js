import React from "react";
import { shallow, mount } from "enzyme";

import Game from "./game";

describe("<Game />", () => {
  it("Renders without crashing", () => {
    shallow(<Game />);
  });
  it("Should render the make guess on load", () => {
    const wrapper = shallow(<Game />);
    wrapper.instance().makeGuess("Please enter a valid number");
  });
  it("Can starts a new game", () => {
    const wrapper = shallow(<Game />);
    // Change state to test to see if it works when restartGame function is called
    wrapper.setState({
      guesses: [22, 33],
      feedback: "This is a game?",
      correctAnswer: 3
    });
    wrapper.instance().restartGame();
    expect(wrapper.state("guesses")).toEqual([]);
    expect(wrapper.state("feedback")).toEqual("Make your guess!");
    expect(wrapper.state("correctAnswer")).toBeGreaterThanOrEqual(0);
    expect(wrapper.state("correctAnswer")).toBeLessThanOrEqual(100);
  });
  it("Can make guesses", () => {
    const wrapper = shallow(<Game />);
    // Set the answer to 100 to test diffent guesses
    wrapper.setState({
      correctAnswer: 100
    });

    wrapper.instance().makeGuess(25);
    expect(wrapper.state("guesses")).toEqual([25]);
    expect(wrapper.state("feedback")).toEqual("You're Ice Cold...");

    wrapper.instance().makeGuess(60);
    expect(wrapper.state("guesses")).toEqual([25, 60]);
    expect(wrapper.state("feedback")).toEqual("You're Cold...");

    wrapper.instance().makeGuess(80);
    expect(wrapper.state("guesses")).toEqual([25, 60, 80]);
    expect(wrapper.state("feedback")).toEqual("You're Warm.");

    wrapper.instance().makeGuess(95);
    expect(wrapper.state("guesses")).toEqual([25, 60, 80, 95]);
    expect(wrapper.state("feedback")).toEqual("You're Hot!");

    wrapper.instance().makeGuess(100);
    expect(wrapper.state("guesses")).toEqual([25, 60, 80, 95, 100]);
    expect(wrapper.state("feedback")).toEqual("You got it!");
  });
});
